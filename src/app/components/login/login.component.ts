import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/interfaces/ilogin';
import { ConfigService } from 'src/app/services/config.service';

import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showLoginError: boolean;
  public infoLogin: ILogin;   // interface que va a contener email y password
  usuarios: Usuario[];

  // inyectamos el ConfigService, e inicializamos showLoginError y los 2 campos de la ILogin email y password 
  // vacios, e inyectamos el servicio AuthService.
  constructor(private config: ConfigService, private auth: AuthService, 
    private router: Router) { 
    this.showLoginError = false;
    this.infoLogin = {
      email: '',
      password: ''
    }
  }

  // Si por alguna razon estamos dentro de la app y le damos en la uri http://localhost/login
  // se reirija a resume 
  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/resume'])
    }
  }

  // Comprobamos si el login es correcto mediate email y password
  checkLogin(): void{
    /*this.auth.login(this.infoLogin).subscribe(
      e => this.infoLogin = e
    );*/
  }

  // metodo que valida login
  login(){
    //console.log("infoLogin.email", this.infoLogin.email)
    //console.log("infoLogin.password", this.infoLogin.password)
        
    this.auth.login(this.infoLogin).subscribe(listuser => {
      //console.log("listuser", listuser)
      e => this.usuarios = e;

      if (listuser.length > 0) {
        console.log("Bienvenido", listuser);
        this.showLoginError  = false;
        // Setiamos la vble isLogged que esta en auth y significa que esta logeado
        this.auth.isLogged = true
        this.router.navigate(['/resume']);
      }else{
        console.log("usuario no encontrado", listuser);
        this.showLoginError = true;
        this.auth.isLogged  = false
      }

    }, error => {
      this.showLoginError = true;
      console.error("Error al recuperar el usuario: " + error);
      this.showLoginError = true;
      this.auth.isLogged = false      
    });    
  }

  // Crea una cuenta para un usuario nuevo
  crearCuenta(){
    //location.href="/signin"
    //location.href = "https://www.w3schools.com";
    
  }


}
