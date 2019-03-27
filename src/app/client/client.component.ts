import {Component, OnInit} from '@angular/core';
import {Client} from '../model/client';
import {HttpService} from '../service/http.service';
import {ActivatedRoute} from '@angular/router';
import {Message} from '../model/message';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private clientId: number;

  client: Client = new Client();
  messages: Message[];

  command: string;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.route.params.subscribe(params => {
      this.clientId = +params['id'];
    });


    this.httpService.get<Client>('http://localhost:8080/client/' + this.clientId).subscribe(client => {
      this.client = client;
    });
    this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 1000);
  }

  private fetchMessages() {
    this.httpService.get<Message[]>('http://localhost:8080/message/' + this.clientId).subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnInit() {
  }

}
