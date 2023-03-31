import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importamos lodash para hacer los metodos get que traen los datos del json app-config.json
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // Objeto json qu va a tener los datos
  private _data: any; 

  // Este servicio lo que va a hacer en cargar la configuración inicial de nuestra app
  constructor(private httpClient: HttpClient) { }

  // retornar una promesa y con el get va por el json que esta en esa ruta
  public getData(){
    return new Promise((resolve, reject) =>{
      this.httpClient.get('assets/config/app-config.json').subscribe(data =>{
        this._data = data;
        resolve(true);
      }, error =>{
        console.error("Error al obtener la configuración: " , error );
        reject(true);
      })
    })
  }

  // Creo un metodo por cada propiedad que tenga el app-config.json
  get logo(){
    return _.get(this._data, 'logo');
  }

  get logoLogin(){
    return _.get(this._data, 'logoLogin');
  }

  // Con estos nombres se capturan en vista/ventana por ejm este se utiliza en sidebar.component.html
  get nameSite(){
    return _.get(this._data, 'name_site');
  }
  
  get min(){
    return _.get(this._data, 'min');
  }

  get max(){
    return _.get(this._data, 'max');
  }  

  get numUsers(){
    return _.get(this._data, 'num_users');
  }  
}
