import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // Value equivale a todas las categorias en este caso
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultcategories = [];
    for (const category of value) {
      if (category.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultcategories.push(category);
      };
    };
    return resultcategories;
  }  

}
