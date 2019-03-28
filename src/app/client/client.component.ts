import {Component, OnInit} from '@angular/core';
import {Client} from '../model/client';
import {HttpService} from '../service/http.service';
import {ActivatedRoute} from '@angular/router';
import {Message} from '../model/message';
import {Command} from '../model/command';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: Client = new Client();
  messages: Message[];
  commandModel: Command;
  private clientId: number;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
    });

    this.commandModel = new Command();
    this.commandModel.command = '';
  }

  ngOnInit() {
    this.httpService.get<Client>('http://localhost:8085/client/' + this.clientId).subscribe(client => {
      this.client = client;
    });
    this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 1000);
  }

  setCommand() {
    switch (this.commandModel.command) {
      case '':
        break;
      case 'clear':
        this.clearMessages();
        break;
      default:
        this.sendCommand();
    }
  }

  private clearMessages() {
    this.httpService.post('http://localhost:8085/message/' + this.clientId + '/clear')
      .subscribe(success => {
        console.log('Clear Messages ' + success);
      });
    this.commandModel.command = '';
    this.fetchMessages();
  }

  private sendCommand() {
    this.httpService.post('http://localhost:8085/out/' + this.clientId + '?command=' + this.commandModel.command)
      .subscribe(success => {
        console.log('Changed Command ' + success);
      });
    this.commandModel.command = '';
    this.fetchMessages();
  }

  private fetchMessages() {
    this.httpService.get<Message[]>('http://localhost:8085/message/' + this.clientId).subscribe(messages => {
      this.messages = messages;
    });
  }
}
