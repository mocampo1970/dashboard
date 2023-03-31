import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
// Importamos lodash
import * as _ from 'lodash';
import { forEach } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase PostController 
  // y alli halamos api/post y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/post y queda http://localhost:8080/api/post
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/post
  // aqui mapeamos la URL del backend http://localhost:8080/api/post y alla en spring boot 
  // que es el backend mapeamos en PostController la de aqui http://localhost:4200
  // @RestController
  // @RequestMapping("/api/post")  
  private url: string = "http://localhost:8080/api/post";  

  constructor(private httpClient: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del postController que devuelve una lista de post
  // Obtiene los post, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona.  
  getAll(): Observable<Post[]>{
    // Se captura la fecha del dia
    var dateDay = new Date().getDay();
    var d = new Date();
    //console.log("post.service: dateDay", dateDay)
    //console.log("post.service: d", d)    
    return this.httpClient.get<Post[]>(this.url);
  }

  /**
   * Devuelve los posts
   */
   getPosts(): Observable<Post[]> {
      return this.httpClient.get<Post[]>(this.url);
    //return this.afd.list<Post>('posts').valueChanges();
  }  

  // Metodo que permite crear el post, o sea llama al postmapping del apirest, 
  // tener en cuenta el upload de la imagen
  addPost(post: Post): Observable<Post>{

    // Se captura la fecha del dia
    var dateDay = new Date().getDay();
    var d = new Date();
    post.fecha =  d;
    //console.log("dateDay", dateDay)
    //console.log("d", d)
    
    return this.httpClient.post<Post>(this.url, post);
  }

  // Eliminar vamos al eliminar del postController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  deletePost(id: number): Observable<Post>{
    return this.httpClient.delete<Post>(this.url+'/'+id )
  }

  /**
   * Borro posts con los ids dados
   * @param ids ids a borrar
   */
  deletePosts(ids: string[]) {

    // Recorro los ids
    forEach(ids, id =>
      // Obtengo el elmento y lo elimino
      this.httpClient.delete<Post>(this.url+'/'+id )
      //this.afd.object('/posts/' + id).remove() este es el de firebase
    );

  }  

}
