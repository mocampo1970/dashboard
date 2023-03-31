import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

// Este servicio es de backend el de firebase es CommentService en singular
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase CommentsController 
  // y alli halamos api/comments y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/comments y queda http://localhost:8080/api/comments
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/comments
  // aqui mapeamos la URL del backend http://localhost:8080/api/comments y alla en spring boot 
  // que es el backend mapeamos en commentsController la de aqui http://localhost:4200
  // @RestController
  // @RequestMapping("/api/comments")
  private url: string="http://localhost:8080/api/comments";

  // Inyectamos el http  
  constructor(private http: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del commentController que devuelve una lista de comentarios
  // Obtiene los comentarios, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona.
  getAll(): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.url);
  }  


  
}
