import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverUrl = ' https://sahaya-cs.herokuapp.com/api/v1/user/';
  constructor(private http: HttpClient) {}

  authenticateUser(authenticateRequest: any) {
    return this.http.post<any>(
      this.serverUrl + 'authenticate',
      authenticateRequest
    );
  }
}
