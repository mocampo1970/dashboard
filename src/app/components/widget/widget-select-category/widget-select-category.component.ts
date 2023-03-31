import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-widget-select-category',
  templateUrl: './widget-select-category.component.html',
  styleUrls: ['./widget-select-category.component.css']
})
export class WidgetSelectCategoryComponent implements OnInit {

  // Output para devolver las categorias seleccionadas
  @Output() select: EventEmitter<string[]>;

  // Importa el model category.ts
  public categories: Category[];
  public selectedCategories: string[];

  // Inyecta las categorias e inicializa las categorias en vacio
  constructor(
    private categoryService: CategoryService
  ) { 
    this.categories = [];
    this.selectedCategories = [];
    this.select = new EventEmitter<string[]>();    
  }

  // Recupera las categorias
  ngOnInit(): void {
    // Obtengo las categorias, ese listCategories es una vble como un alias.
    //=======================================================================================================
    // Nota importante:  ESTO SE puede hacer asi como sigue en estas 5 lineas o como las de abajo 3 lineas
    //=======================================================================================================
    //this.categoryService.getAll().subscribe(listCategories => {
    //  this.categories = listCategories;
    //  this.showCategories = true;
    //}, error => {
    //  console.error("Error al recuperar las categorias: " + error);
    //  this.showCategories = true;
    //})    
    this.categoryService.getAll().subscribe(listCategories =>
      this.categories = listCategories)
  }

  //
  sendCategories(){
    // Emite las categorias seleccionadas
    this.select.emit(this.selectedCategories);
  }

}
