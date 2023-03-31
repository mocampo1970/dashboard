import { AfterViewChecked, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

// Esta directiva se va a usar en category.component.html
// este nombre es muy importante, lo voy a colocar highlight aparecia inicialmente apphighlight
@Directive({
  selector: '[highlight]'
})

// El viene sin el implements se le adiciona el OnChanges y AfterViewChecked
export class HighlightDirective implements OnChanges, AfterViewChecked{

  // Palabra a buscar
  @Input('search') word: string;

  // Indica si esta o no renderizada el HTML
  private viewRendered: boolean;

  constructor(private el: ElementRef) {
    this.viewRendered = false;
  }

  ngAfterViewChecked(): void {
    this.viewRendered = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambie el atributo word, se vuelve a ejecutar
    if (changes["word"]) {
      this.highlightSearchTerm();
    }
  }

  /**
   * Marca las correspondencias
   */
  public highlightSearchTerm() {

    // Solo se activa cuando haya una palabra o mas de 3 letras
    if (!this.word || this.word.length < 3) {
      // Solo si esta renderizado
      if (this.viewRendered) {
        this.removeMarks();
      }

    } else {

      if (this.el.nativeElement) {
        // Reseteo
        this.removeMarks();

        // Pongo las marcas
        this.putMarks();
      }

    }

  }

  /**
   * Pone las etiquetas <mark> entre las coincidencias
   */
  private putMarks() {
    const searchRegex = new RegExp(this.word, 'gmi');
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(searchRegex, match => `<mark>${match}</mark>`);
  }

  /**
   * Elimina las marcas
   */
  private removeMarks() {

    this.el.nativeElement.querySelectorAll("*").forEach(element => {
      // Busco las etiquetas mark
      const regex = new RegExp('<mark>|</mark>', 'gi');
      // Remplazo las marcas por una cadena vacia
      const cleanText = element.parentNode.innerHTML.replace(regex, '');
      element.parentNode.innerHTML = cleanText;
    });

  }


/*  private viewRendered: boolean;

  // Podemos trabajar con input y le podemos poner un nombre en este caso search
  @Input('search') word: string;

  // Inyectar ese ElementRef es muy importante
  constructor(private el: ElementRef) {
    this.viewRendered = false;
   }

  ngAfterViewChecked(): void {
    this.viewRendered = true;
  }
  // Viene muy bien porque cada vez que hagamos un cambio en el input no tenemos que estar
  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambie el atributo word, se vuelve a ejecutar
    if (changes["word"]) {
      this.highlightSearchTerm();
    }    
  }

  //

   public highlightSearchTerm() {

    // Solo se activa cuando haya una palabra o mas de 3 letras
    if (!this.word || this.word.length < 3) {
      // Solo si esta renderizado
      if (this.viewRendered) {
        this.removeMarks();
      }

    } else {

      if (this.el.nativeElement) {
        // Reseteo
        this.removeMarks();

        // Pongo las marcas
        this.putMarks();
      }

    }

  }


  // Pone las marcas
  private putMarks(){
    const searchRegex = new RegExp(this.word, 'gmi');
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(searchRegex, match => `<mark>${match}</mark>`);
  }

  // remueve las marcas
  private removeMarks(){
    // Estamos muy acostumbrados a usar frameworks para acceder a consultas complejas en el DOM
    // (normalmente con jQuery) y hemos pasado por alto que existe dos funciones muchísimo más potentes, 
    // simples y optimizadas para realizar la misma labor.
    // De forma nativa nuestro navegador soporta querySelector() y querySelectorAll(), que nos devuelve 
    // elementos de nuestra web especificando selectores CSS.
    this.el.nativeElement.querySelectorAll("*").forEach(element => {
      // va a buscar los que tengan ese mark y sea gi global  y no tenga en cuenta mayusculas y minusculas
      const regexp = new RegExp('<mark>|</mark>', 'gi');
      // aqui lo que hago es reemplaza ese mark por '' o sea quitarselo
      const cleanText = element.parentNode.innerHTML.Replace(regexp, '');
      // lo limpio
      element.parentNode.innerHTML = cleanText;
    });
  }*/

}
