import {Component, OnInit} from '@angular/core';
import {Client} from '../model/client';
import {HttpService} from '../service/http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  clients: Client[];

  constructor(private httpService: HttpService) {
    this.httpService.get<Client[]>('http://scorewinner.ch:8085/client').subscribe(clients => {
      this.clients = clients;
    });
  }

  ngOnInit() {
  }

}
