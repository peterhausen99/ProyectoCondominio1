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


@NgModule({
  declarations: [ AppComponent  ],
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
    AppRoutingModule,
    PlanModule,
          
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
