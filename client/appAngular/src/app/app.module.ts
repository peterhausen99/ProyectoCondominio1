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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ AppComponent  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    BrowserAnimationsModule,
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    ResidenciaModule,
    
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
