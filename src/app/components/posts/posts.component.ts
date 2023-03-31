import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { TranslateService } from 'src/app/services/translate.service';
import { forEach, find } from 'lodash-es';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  // definimos la vble categories que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  posts: Post[];

  public selectedPosts: string[];
  public showPosts: boolean;
  public searchWord: string;  
  public cols: any[];


  // Inyectamos el postService para luego traer los post
  constructor(private postService: PostService, private categoryService: CategoryService, 
    private translateService: TranslateService) { 
    this.showPosts = true
    this.posts = [];
    // Creo las columnas para la tabla
    this.cols = [
      { header: '' },
      { header: this.translateService.getTranslate('label.title') },
      { header: this.translateService.getTranslate('label.date.post') },
      { header: this.translateService.getTranslate('label.categories') },
      { header: this.translateService.getTranslate('label.thumbnail') }
    ];
    this.selectedPosts = [];    
  }

  filterPost = '';


  // Recupera los posty la categoria mediante 2 getAll
  ngOnInit(): void {
    //================================================================================
    // este es solo para recuperar los post 
    //this.postService.getAll().subscribe(
    //  ps => this.posts = ps); 
    //================================================================================

    // Obtengo los posts
    this.postService.getAll().subscribe(posts => {
      // Obtengo las categorias
      this.categoryService.getAll().subscribe(categories => {
        // Recorro los posts
        forEach(posts, p => {
//          console.error("post " + posts + " p " + p);
          // Recorro las categorias
          forEach(p.categories, (c_post, index) => {
//            console.error("c_post ", c_post);
//            console.error("index ", index);            
            // Busco la categoria dentro del posts 
            const categoryFound = find(categories, c => c.id === c_post);
//            console.error("categoryFound " , categoryFound);
            // Si esta, la asocio
            if (categoryFound) {
              //console.error("Encontro la categoria" , categoryFound)
              p.categories[index] = categoryFound
              console.error("p.categories " , p.categories);
            }

          });   // Cierra foreach de categories
        });     // cierra foreach de post
        console.log("esos son los posts en post.component.ts", posts)
        this.posts = posts;
        this.showPosts = true;

      }, error => {
        console.error("Error al recuperar las categorias: " ,  error);
        this.showPosts = true;
      })  // cierra el subscribe de categories
    }, error => {
      alert("error recuperando el post por favor verifique las categorias");
      console.error("Error al recuperar los posts: Verifique que la categoria exista y los datos del post" , error);
      this.showPosts = true;
    })  // Cierra el subscribe del post
 
    this.selectedPosts = [];   

  }

  // metodo para borrar post, aqui pueden ser varios post
  deletePosts(){
    // Vamos a recorrer cuales tiene el chulo, y si tiene el chulo llamar el postservice el metodo
    // eliminar de ese post, para que elimine solo ese, pero como el va a recorrer puede eliminar
    // varios
    console.log("selectedPosts", this.selectedPosts);   
    
    // Tema de sweetalert2
    /*Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "El registro del (los) post: seleccionados" + post.nombres + ' ' + post.apellidos,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // Si confirman que eliminan 
      if (result.isConfirmed) {
        // Vamos a ingresar aqui el codigo de eliminar
        this.estudianteService.delete(estudiante.id).subscribe(
          res => this.estudianteService.getAll().subscribe(
          response => this.estudiantes = response  
          )
        ) 
        Swal.fire(
          'Eliminado!',
          'Tu registro fue eliminado.',
          'success'
        )
      }
    })*/


  }

  /**
   * Borra los posts seleccionados
   */
   deletePostss() {
    this.postService.deletePosts(this.selectedPosts);
    this.selectedPosts = [];
  }  

  /**
   * Actualiza la cadena buscada para la directiva
   * @param value cadena buscada
   */
   updateWord(value) {
    this.searchWord = value;
  }  


}

