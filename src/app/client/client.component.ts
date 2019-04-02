import {Component, OnInit} from '@angular/core';
import {Client} from '../model/client';
import {HttpService} from '../service/http.service';
import {ActivatedRoute} from '@angular/router';
import {Message} from '../model/message';
import {Image} from '../model/image';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client: Client = new Client();
  messages: Message[];
  command: string;
  private clientId: number;
  loading: boolean;
  images: Image[];

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.loading = true;
    this.command = '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
    });
    this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 1000);
  }

  setCommand() {
    switch (this.command) {
      case '':
        break;
      case 'clear':
        this.clearMessages();
        break;
      default:
        this.sendCommand();
    }
  }

  setNickname() {
    this.httpService.post('http://scorewinner.ch:8085/api/client/' + this.clientId + '/nickname?nickname=' + this.client.nickname)
      .subscribe(success => {
        console.log('Changed Nickname ' + success);
      });
  }

  private clearMessages() {
    this.httpService.post('http://scorewinner.ch:8085/api/message/' + this.clientId + '/clear')
      .subscribe(success => {
        console.log('Clear Messages ' + success);
      });
    this.command = '';
    this.fetchMessages();
  }

  private sendCommand() {
    this.httpService.post('http://scorewinner.ch:8085/out/' + this.clientId + '?command=' + this.command)
      .subscribe(success => {
        console.log('Changed Command ' + success);
      });
    this.command = '';
    this.fetchMessages();
  }

  private fetchMessages() {
    this.httpService.get<Message[]>('http://scorewinner.ch:8085/api/message/' + this.clientId).subscribe(messages => {
      this.messages = messages;
      this.loading = false;
    });
    this.httpService.get<Client>('http://scorewinner.ch:8085/api/client/' + this.clientId).subscribe(client => {
      this.client = client;
      this.loading = false;
    });
  }
}
