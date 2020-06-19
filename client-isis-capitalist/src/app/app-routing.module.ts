import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_ECRAN_PRINCIPAL } from 'src/config/router-constants';




const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
