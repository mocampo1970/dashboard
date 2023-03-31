import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  // Para el modal
  @ViewChild("modal_add_post", { static: false }) modal_add_post;

  // Creo objeto post
  public post: Post;
   
  // Inyectamos el PostService y el modalservice para utilizarlo abajo cuando adicione un post y el 
  // router es para direccionar a otra ventana.
  constructor(private postService: PostService, private modalService: NgbModal, private router: Router) {
    this.post = new Post();
  }

  ngOnInit(): void {
  }

  // Metodo que va a tener la logica que va a hacer el guardar, me subscribo y si sale bien
  // voy a la pagina de estudiantes que es la que consulta los estudiantes y es la que definimos en
  // app.routing.module estudiantes o tambien como se llama la ventana(pagina o la vista) estudiantes
  // y el parametro es el model estudiante
  // en este create despues del subscribe le tenia este:  p => this.personas = p
  // se lo cambie por: res =>this.router.navigate(['/personas'])  para que me abra la ventana
  // de personas apenas grabe una persona
  /*create(): void{
    console.log(this.persona);
    // subscribe para crear y subscribe para getAll (despues de que grabe me lo muestre en pantalla)
    this.personaService.create(this.persona).subscribe(
      res => this.personaService.getAll().subscribe(
      response => this.personas = response 
      )
    )
  }*/

 // Metodo que va a tener la logica que va a hacer el guardar, me subscribo y si sale bien
  // voy a la pagina de post que es la que consulta los post y es la que definimos en
  // app.routing.module post o tambien como se llama la ventana(pagina o la vista) post
  // y el parametro es el model post
  // en este create despues del subscribe le tenia este:  p => this.post = p
  // se lo cambie por: res =>this.router.navigate(['/post'])  para que me abra la ventana
  // de post apenas grabe un post
  addPost(): void{
    console.log("addpost", this.post);
    // subscribe para crear 
    this.postService.addPost(this.post).subscribe(
      p => this.post = p
    )

    // muestra modal de exito de addpos
    this.modalService.open(this.modal_add_post);

    // Apenas guarde va a otra ventana
    this.router.navigate(['/posts']);
  }    


  getCategories($event){
    console.log($event)
    this.post.categories = $event;
  }

   /**
   * Obtengo la ruta de la imagen del widget
   * @param $event Ruta de la imagen seleccionada
   */
    getPath($event) {
      this.post.img = $event;
    }

}
