import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OverviewComponent} from './overview/overview.component';
import {ClientComponent} from './client/client.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './auth.guard';
import {AuthService} from './service/auth.service';

const appRoutes: Routes = [
  {path: '', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'client/:id', component: ClientComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ClientComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
