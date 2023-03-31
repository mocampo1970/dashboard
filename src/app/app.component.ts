import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  // Inyectamos el servicio de auth para el tema de la autenticación en la primera ventana 
  // que se va a utilizar si se autentica muestra algo sino muestra el login
  constructor(public auth: AuthService) {}

}
