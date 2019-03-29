import {Component, OnInit} from '@angular/core';
import {Login} from '../model/formmodel/login';
import {HttpService} from '../service/http.service';
import {SessionId} from '../model/sessionId';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: Login;

  constructor(private httpService: HttpService, private cookieService: CookieService) {
    this.loginModel = new Login();
  }

  ngOnInit() {
    this.loginModel.username = '';
    this.loginModel.password = '';
  }

  login() {
    this.httpService.post<SessionId>('http://scorewinner.ch:8081/api/2/login?name='
      + this.loginModel.username + '&password=' + this.loginModel.password)
      .subscribe(session => {
        this.cookieService.set('hermann-session', session.sessionId);
      });
    window.location.href = '';
  }
}
