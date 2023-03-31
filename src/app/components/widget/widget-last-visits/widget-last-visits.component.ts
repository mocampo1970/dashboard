import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
// Es muy parecido al lodash
//import * as moment from 'moment';


@Component({
  selector: 'app-widget-last-visits',
  templateUrl: './widget-last-visits.component.html',
  styleUrls: ['./widget-last-visits.component.css']
})
export class WidgetLastVisitsComponent implements OnInit {

  // Vbles para las graficas
  public data: any;
  public options: any;

  // vamos a hacer lo de la grafica, inyectamos nuestro servicio de configuración,
  // options son opciones del reporte, por ejm legend es para mostrar o no el titulo
  constructor(
    private configService: ConfigService
  ) {
    this.options = {
      legend: {
        display: false
      }
    };
    // Invoca metodo que construye el grafico
    this.buildData();
   }

  ngOnInit(): void {
  }

  // vamos a rellenar este objeto data, este hay documentación en charts
  // https://www.primefaces.org/primeng/showcase/#/chart/line
  private buildData(){
    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
          bordercolor: '#565656'
        }
      ]
    }

    // Una vez creada la estructura le hacemos un for normal, le vamos a colocar 10 pero puede ser el largo
    // de un arreglo    //
    for (let i= 0; i < 10; i++) {
      // Generamos un nro aleatorio, esto es javascript
      const random = Math.floor(Math.random() * (this.configService.max - this.configService.min) +
                     this.configService.min)

      // Vamos llenando el dataset
      this.data.datasets[0].data.push(random);

      // Genero el dia restando dias. 
      // Nota: como esta en la clase con el profe el hace
      //       const day = moment().subtract('days', i).format('MMM-DD'); salia deprecated
      //       buscando documentacion en esta: https://momentjscom.readthedocs.io/en/latest/
      //       y esta muestra https://momentjscom.readthedocs.io/en/latest/moment/03-manipulating/02-subtract/
      //       cambio por la que coloque que sale buena
      //const day = moment().subtract(1, 'days').format('MMM-DD'); 

      //this.data.labels.push(day); 
      
    }

  }

}
