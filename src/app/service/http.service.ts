import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get<G>(url: string) {
    return this.http.get<G>(url);
  }

  post<G>(url: string) {
    return this.http.post<G>(url, null);
  }

}
