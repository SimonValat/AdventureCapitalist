import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcranPrincipalComponent } from './features/ecran-principal/ecran-principal.component';
import { ProductComponent } from './features/product/product.component';
import {RestService} from './service/rest.service';

@NgModule({
  declarations: [
    AppComponent,
    EcranPrincipalComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  providers: [
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
