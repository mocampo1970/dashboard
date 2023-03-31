import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-widget-upload-thumbnail',
  templateUrl: './widget-upload-thumbnail.component.html',
  styleUrls: ['./widget-upload-thumbnail.component.css']
})
export class WidgetUploadThumbnailComponent implements OnInit {

  // @Output -> es comunicación de cambios de los hijos hacia los padres por medio de eventos personalizados, 
  // generados con propiedades.
  // @Input -> permitían comunicar datos desde el componente padre hacia el componente hijo
  // Crear output para enviar la ruta.
  // https://desarrolloweb.com/articulos/emision-eventos-output-angular.html (se explica muy bien el output)
  @Output() sendPath: EventEmitter<string>;

  public loadImg: boolean;

  public img: File;

  constructor(private imagenService: ImagenService) {
    this.sendPath = new EventEmitter<string>();
    this.loadImg  = true;
   }

  ngOnInit(): void {
  }

  upLoadFile($event){

   // Creo el id de la imagen con el tiempo
   const id= new Date().getTime().toString();
   // Obtengo la ruta del fichero subido
   const file = $event.target.files[0];
   console.log("paso 3upLoadFile de WidgetUploadThumbnailComponent", $event.target.file[0]);     
   // Obtengo la ruta de donde quiero guardarlo en firebase
   const path = 'thumbnails/'+id;


   let self = this;

    
    // Lo traje de nuevacomponent que llama el servicio para cargar la imagen
    //this.imagenService.upload(img).
    
    this.imagenService.upload(file).subscribe(
      data => {
        //this.router.navigate(['/']);
        this.loadImg = true;
      }, err =>{
        // Este mensaje es el que definimos en en backend
        alert(err.console.error.mensaje);
        console.log("error", err);
        //this.reset();
      }
    );


  }

}
