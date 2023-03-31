import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ILogin } from '../interfaces/ilogin';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = "http://localhost:8080/api/usuarios";    

  // inyecto el servicio
  constructor(private http: HttpClient) { }

  // Login
  login1(user: any){
    return this.http.post(this.url, user);
  }
  //login(infoLogin: ILogin): Observable<Usuario>{
    //return this.http.post(this.url, infoLogin);
  //}

}
