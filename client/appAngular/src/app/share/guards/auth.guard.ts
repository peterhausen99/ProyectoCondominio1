import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated:boolean;
  currentUser: any;
  constructor(private authService:AuthenticationService, 
    private router: Router) {
      //Subscribirse para obtener si esta autenticado
      this.authService.isAuthenticated.subscribe(
        (valor) => (this.isAuthenticated = valor)
      );
      //Subscribirse para obtener el usuario autenticado
      this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(route, url);
      
  }
  //Verificar que el rol del usuario coincida
  //con alguno de los indicados
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.isAuthenticated) {
      const idPerfilUsuario = this.currentUser.usuario.perfilUsuarioId;
      
      if(route.data['perfilUsuario'].length && !route.data['perfilUsuario'].includes(idPerfilUsuario)){ 
        this.router.navigate(['/usuario/login'], {
          //Parametro para mostrar mensaje en login
          queryParams: { auth: 'no' }
        });
        return false;
      }
      return true;
    } 

    this.router.navigate(['/usuario/login'], {
      queryParams: { auth: 'no'}
    });
    return false;
  }
}
