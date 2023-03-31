import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  // Aqui vamos a declarar un objeto de tipo category que es el model para poder mapearlo en la vista
  category: Category = new Category();  

  // Para el modal
  @ViewChild("modal_add_category", { static: false }) modal_add_category;

  // inicia vacio la categoria e inyecta el servicio, el router y el modal
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) { 

  }

  ngOnInit(): void {
  }

  //=======================================================================================================
  // Nota importante:  ESTO SE puede hacer asi como sigue en estas 3 lineas o como las de abajo que muestra 
  //                   el error
  //=======================================================================================================  
  //create(){
  //  this.categoryService.create(this.category).subscribe(  
  //    res => this.router.navigate(['/categories']);
  //  )
  //}
  create(){
    this.categoryService.create(this.category).subscribe(
      res => {
      // Primero muestra el modal y luego abre la vista de consulta de categorias
      console.log("entro create add-category", res)
      this.modalService.open(this.modal_add_category);
      this.router.navigate(['/categories']);
    }, error => {
      console.error("Error al recuperar las categorias: " + error);
    })
  }  
  


}
