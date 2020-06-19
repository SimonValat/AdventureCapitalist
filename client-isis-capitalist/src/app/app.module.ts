import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './features/product/product.component';
import {RestService} from './service/rest.service';
import { BigvaluePipe } from './bigvalue.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BigvaluePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  providers: [
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
