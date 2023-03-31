import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Hay veces que queremos que determinadas áreas de nuestra aplicación web estén protegidas y solo 
// puedan ser accedidas si el usuario ésta logueado (un panel de control por ejemplo) o incluso 
// que solo puedan ser accedidas por determinados tipos de usuarios. 
// Para conseguir esto con Angular se usan los guards. Los guards pueden ser extensibles para que 
// permitan acceder bajo las condiciones que nosotros queramos, podemos incluso hacer peticiones 
// a un backend antes de que el usuario entre en la página. Pagina que explica brevemente los guard.

// Se debe ir uno a app.routing

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  // Inyectamos el authService y el router
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(){
    
    if (!this.auth.isAuthenticated) {
      console.log("No estas logeado");
      this.router.navigate(['/login']);
      return false;
    }

    return true;

  }
}
