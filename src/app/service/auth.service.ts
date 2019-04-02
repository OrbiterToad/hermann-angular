import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {SessionId} from '../model/sessionId';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService,
              private router: Router,
              private cookieService: CookieService) {
  }

  private _user: User;

  get user(): User {
    let sessionId = this.cookieService.get('hermann-session');
    if (sessionId == null) {
      sessionId = this.cookieService.get('sessionId');
    }

    this.httpService.get<User>('http://scorewinner.ch:8081/api/2/user?sessionId=' + sessionId)
      .subscribe(user => {
        this._user = user;
      });
    return this._user;
  }

  login(loginModel) {
    this.httpService.post<SessionId>('http://scorewinner.ch:8081/api/2/login?name='
      + loginModel.username + '&password=' + loginModel.password)
      .subscribe(session => {
          this.cookieService.set('hermann-session', session.sessionId);
          this.router.navigate(['/']);
        }
      );
  }
}
