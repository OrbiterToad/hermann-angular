import {Component, OnInit} from '@angular/core';
import {Login} from '../model/formmodel/login';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: Login;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginModel = new Login();

    this.loginModel.username = '';
    this.loginModel.password = '';

    if (this.authService.user != null) {
      this.router.navigate(['/']);
    }
  }

  login(event) {
    event.preventDefault();
    this.authService.login(this.loginModel);
  }
}
