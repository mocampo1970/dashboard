import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private _data: any;

  constructor(private http: HttpClient) {
  }

  /*
  * Obtengo las traducciones segun el idioma del navegador
  */
  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/translations/' + navigator.language + '.json')
        .subscribe(data => {
          this._data = data;
          console.log(this._data);
          resolve(true);
        }, error => {
          console.log('Error al recuperar las traducciones: ' + error);
          reject(true);
        });
    })
  }

  /**
   * Devuelve la traduccion indicada
   * @param phrase frase a traducir
   */
  public getTranslate(phrase: string) {
    return this._data[phrase];
  }


}
