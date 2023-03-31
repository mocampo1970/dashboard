import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/ilogin';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Atributo para saber si esta logueado
  private _isLogged: boolean;

  // Vamos a darle la url que tiene el spring boot, vamos a la clase UsuarioController 
  // y alli halamos api/usuario y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/usuarios y queda http://localhost:8080/api/usuarios/email
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/usuarios
  // aqui mapeamos la URL del backend http://localhost:8080/api/usuarios y alla en spring boot 
  // que es el backend mapeamos en UsuarioController la de aqui http://localhost:4200
  // @RestController
  // @RequestMapping("/api/usuarios")  
  private url: string = "http://localhost:8080/api/usuarios/email/";    

  // inyectamos el httpClient
  constructor(private http: HttpClient, private router: Router ) { 
    this._isLogged = false;

    //this.http.get<Usuario[]>(this.url+'/'+"?email="+this.email+"&password="+infoLogin.password).subscribe(user => {
    //  if (user) {
    //    this._isLogged = true
    //  }
    //})
  }

  // Metodo login pasamos parametro de la interfaz que se hace ngModel en el login.component.html
  // y hacemos get hacia el backend
  login(infoLogin: ILogin): Observable<Usuario[]>{
    // asi se asignan datos a localstorage https://itelisoft.com/como-utilizar-el-localstorage-en-angula/
    //localStorage.setItem('usuario', JSON.stringify(infoLogin.email));
    //localStorage.setItem('usuario', JSON.stringify(true));
    //console.log("email en login ", infoLogin.email)
    //console.log("password en login", infoLogin.password)
    //http://localhost:8080/api/usuarios/email/?email=maoocampo@hotmail.com&password=mao
    return this.http.get<Usuario[]>(this.url+'/'+"?email="+infoLogin.email+"&password="+infoLogin.password);
  }

  // Se hace get y set de isLogged, pero sol dejamos el set para poderla modificar por ejm
  // desde login.component.ts y el get es lo mismo que el ste metodo isAuthenticated
  // por eso no lo hice
  set isLogged(value: boolean) {
    this._isLogged = value;
  }

  // Indica si esta o no logueado
  isAuthenticated() {
    //return localStorage.getItem("logged");
    return this._isLogged;
  }  

  // realmente is_Logged reemplaza a removeItem pero los dejamos los 2
  logout(){
    localStorage.removeItem("logged")
    this._isLogged = false;
    this.router.navigate(['/login']);
  }


}
