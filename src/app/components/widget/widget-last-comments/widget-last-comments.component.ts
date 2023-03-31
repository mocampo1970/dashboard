import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-widget-last-comments',
  templateUrl: './widget-last-comments.component.html',
  styleUrls: ['./widget-last-comments.component.css']
})
export class WidgetLastCommentsComponent implements OnInit {

  // definimos la vble comments que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  public comments: Comment[];
  public numComments: number;

  // Inyectamos los comentService que trae los comentarios e inicializamos el arreglo de coments
  constructor(private commentService: CommentService) { 
    this.comments = [];
  }

  // Cuando cargue la vista ejecuta el metodo recuperar todos y con el subscribe ocurre la
  // magia de obtener la lista de comentarios, con funciones de flecha => y donde 
  // e es una vble si tuviera mas 
  // debe declararse con public para poder acceder a ella desde aqui  
  ngOnInit(): void {
    this.commentService.getAll().subscribe(
      comments => this.comments = comments
    );
  } 

//  this.commentsService.getAll().subscribe(
//    listComments => {this.numComments = listComments.length;
//  });  

}
