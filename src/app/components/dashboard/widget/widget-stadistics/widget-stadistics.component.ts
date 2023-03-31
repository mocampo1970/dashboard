import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ConfigService } from 'src/app/services/config.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-widget-stadistics',
  templateUrl: './widget-stadistics.component.html',
  styleUrls: ['./widget-stadistics.component.css']
})
export class WidgetStadisticsComponent implements OnInit {

  public numUsers: number;
  public numPosts: number;
  public numComments: number;

  // Inyectamos el config y los comentarios
  constructor(
    private config: ConfigService,
    private commentService: CommentService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Obtengo el numero de usuarios
    this.numUsers = this.config.numUsers;

    // Obtengo el numero de comentarios de firebase
    // pero no la voy a utilizar mientras voy a utilizar el de abajo que es el backend
    //this.commentService.getComments().subscribe(listComments => {
    //  this.numComments = listComments.length;
    //});

    // Traigo los comentarios del backend con getAll y aqui con el length obtengo el nro de comentarios, debe 
    // ser con {} y lo pongo en la ventana ppal, y ese numComments lo pinto en pantalla en el html
    this.commentService.getAll().subscribe(listComments => {
      this.numComments = listComments.length;
    });

    //this.postService.getPosts.subscribe(listPosts => {
    //  this.numPosts     = listPosts.value;
    //})
 
    //this.numComments = 3;
    this.numPosts     = 20;
  }

}
