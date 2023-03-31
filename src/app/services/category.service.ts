import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase CategoryController 
  // y alli halamos api/category y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/category y queda http://localhost:8080/api/category
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/category
  // aqui mapeamos la URL del backend http://localhost:8080/api/category y alla en spring boot 
  // que es el backend mapeamos en CategoryController la de aqui http://localhost:4200
  // @RestController
  // @RequestMapping("/api/category")  
  private url: string = "http://localhost:8080/api/category";

  constructor(private httpClient: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del categoryController que devuelve una lista de categorias
  // Obtiene las categorias, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona.  
  getAll(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.url);
  }

  // Metodo que permite crear la categoria, o sea llama al postmapping del apirest.
  create(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(this.url, category);  
  }

  // Actualizar y va al metodo actualizarCategory del springboot con putmapping
  // devuelve una categoria 
  update(category: Category): Observable<Category>{
    return this.httpClient.put<Category>(this.url, category);
  }

  // Eliminar vamos al eliminar del categoryController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  delete(id: number): Observable<Category>{
    return this.httpClient.delete<Category>(this.url+'/'+id )
  }

}
