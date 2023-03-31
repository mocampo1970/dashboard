import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // vbles nuevas video del chico que hace login https://www.youtube.com/watch?v=Q6nFeVuV020&t=53s
  public errorInicio: boolean = false;
  public loading: boolean = false;

  usuario: any = {};


  constructor() { }

  ngOnInit(): void {
  }

  // Crear
  crear(){

  }  

  // Crea una cuenta para un usuario nuevo
  regresar(){
    location.href="/login"
    //location.href = "https://www.w3schools.com";
  }  

}
