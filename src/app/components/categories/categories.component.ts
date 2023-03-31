import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  // Nuevo decorador viewChild para trabajar con los modales, conecta el template con el modal
  @ViewChild("modal_editar", {static: false}) modal_editar: any;

  // definimos la vble categories que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  categories: Category[];
  public showCategories: boolean;
  public searchWord: string;

  // Vble que me la voy a llevar al modal con un ngModel
  public id: number;
  public nombre: string;

  // Inyectamos el translate, el categoryService y el modal para poder abrir el modal
  constructor(private translateService: TranslateService, private categoryService: CategoryService,
    private modalService: NgbModal) { 
  }

  filterCategory = '';

  ngOnInit(): void {
    // Obtengo las categorias, ese listCategories es una vble como un alias.
    //=======================================================================================================
    // Nota importante:  ESTO SE puede hacer asi como sigue en estas 3 lineas o como las de abajo que muestra 
    //                   tambien el console.error("Error al recuperar las categorias: " + error);
    //=======================================================================================================
    //this.categoryService.getAll().subscribe(
    //  listCategories => this.categories = listCategories
    //);
    this.categoryService.getAll().subscribe(listCategories => {
      this.categories = listCategories;
      console.error("recupero categorias ngOnInit: " , listCategories);      
      this.showCategories = true;
    }, error => {
      console.error("Error al recuperar las categorias: " + error);
      this.showCategories = true;
    })
  }

  // Para el borrar le vamos a pasar ub objeto completo de category y mediante
  // el id lo eliminamos asi como en PB era getItemNumber(Row, col). En el html le pasamos la  
  // category completa y aqui lo recibimos por eso tenemos arriba importada la clase model
  // category, y cuando se llama el servicio hago subscribe para eliminar y refrescar
  // esta pantalla con el getAll, sino se hace subscribe no hace nada. el subscribe es como el
  // commit digamolo asi, ese primer subscribe hace el delete y el segundo hace el getAll,
  // envia el objeto pero borramos por id , se va a trabajar con un modal que se abre y pregunta  
  deleteCategory(category: Category): void{

    // Se asignan a vbles para que en el modal se puedan mostrar porque el modal pierde el rastro
    // de category.id por ejm
    this.id = category.id;
    this.nombre= category.nombre;

   // Invoca modal, pero como esta abajo es con parametros
    //this.modalService.open(this.modal_success);
    // esta es la forma de recibir parametros de un modal alla se hace un modal.close('yes') y aqui 
    // se reciben
    this.modalService.open(this.modal_editar, {windowClass: "my-modal-dialog"}).result.then(result => {

      // Si selecciona eliminar cuando cierre el modal se va por el yes
      if (result ==='yes') {
        console.log("se va a eliminar la categoria", category.id)
        // Hacer el subscribe para delete y luego subscribe para getAll sin esto no graba y no recupera
        // subscribe es como un commit
        this.categoryService.delete(category.id).subscribe(
          res => this.categoryService.getAll().subscribe(
          u   => this.categories = u  
          )
        )
      }else{
        console.log("se ha cancelado el delete")
      }
    }); // Cierro modalService.open
    
  }

  /**
   * Actualiza la cadena buscada para la directiva
   * @param value cadena buscada
   */
   updateWord(value) {
    this.searchWord = value;
  }

}
