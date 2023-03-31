import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import { IComment } from '../interfaces/icomment';

// este servicio es de firebase el de backend es CommentsService en plural
@Injectable({
  providedIn: 'root'
})
export class CommentServiceFire {

  constructor( 
//    private afd: AngularFireDatabase
    ) { }

  /**
   * Devuelve todos los comentarios
   */
//   getComments(): Observable<IComment[]> {
//    return this.afd.list<IComment>('/comments').valueChanges();
//  }

  /**
   * Devuelve los ultimos 5 comentarios
   */
//   getLastComments(): Observable<IComment[]> {
//    return this.afd.list<IComment>('/comments', ref => ref.orderByChild('date').limitToFirst(5)).valueChanges();
//  }  


}
