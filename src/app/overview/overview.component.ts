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
  loading: boolean;

  constructor(private httpService: HttpService) {
    this.loading = true;
    this.httpService.get<Client[]>('http://scorewinner.ch:8085/api/client').subscribe(clients => {
      this.clients = clients;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  isOnline(lastSeen): boolean {
    // Check if is away longer than 4 minutes
    return (new Date().getTime() - new Date(lastSeen).getTime()) < 180000;
  }
}
