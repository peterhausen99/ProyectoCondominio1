import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { ResidenciaModule } from './residencia/residencia.module';
import { RubroModule } from './rubro/rubro.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PlanModule } from './plan/plan.module';
import { AsignacionplanModule } from './asignacionplan/asignacionplan.module';
import { IncidenciaModule } from './incidencia/incidencia.module';
import { InformacionModule } from './informacion/informacion.module';
import { ReservaModule } from './reserva/reserva.module';

import {HTTP_INTERCEPTORS} from '@angular/common/http'
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';



@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),//importante sin esto no aparece
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    ResidenciaModule,
    RubroModule,
    PlanModule,
    AsignacionplanModule,
    IncidenciaModule,
    ReservaModule,
    InformacionModule,
    AppRoutingModule,
     //TIENE QUE IR DE ULTIMO AppRoutingModule
          
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, 
    useClass: HttpErrorInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
