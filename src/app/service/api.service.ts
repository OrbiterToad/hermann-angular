import {Injectable, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {Client} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  clients: Client[];

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
  }

  getClients(): Client[] {
    return this.clients;
  }

}
