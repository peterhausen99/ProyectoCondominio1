import {AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable ,Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  isAutenticatedAdmin: boolean;
  isAutenticatedRes: boolean;
  currentUser: any;
  qtyItems:Number = 0;
  destroy$:Subject<boolean>=new Subject<boolean>();




  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthenticationService) {

   }

    ngOnInit(): void {
    
    //Suscribirse al observable que gestiona la cantidad de items del carrito
    this.cartService.countItems.subscribe((value)=>{
      this.qtyItems=value;
    });
    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    
    //Subscripción al booleano que indica si esta autenticado
    if(this.currentUser.usuario.perfilUsuarioId==1){
      this.authService.isAuthenticated.subscribe(
        (valor) => (this.isAutenticatedAdmin = valor));
        this.isAutenticatedRes=false;
    }
    else{
      this.authService.isAuthenticated.subscribe(
        (valor) => (this.isAutenticatedRes = valor));
        this.isAutenticatedAdmin=false;
    }
    }

  login(){

    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['usuario/login']);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}

