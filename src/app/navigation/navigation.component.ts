import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {HttpService} from '../service/http.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: User = new User();

  constructor(private httpService: HttpService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
    this.httpService.get<User>('http://scorewinner.ch:8081/api/2/user?sessionId=' + this.cookieService.get('hermann-session'))
      .subscribe(user => {
        this.user = user;
      }, error => {
        this.router.navigateByUrl('/login');
      });
  }

}

