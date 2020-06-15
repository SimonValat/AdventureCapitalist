import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_ECRAN_PRINCIPAL } from 'src/config/router-constants';

import { EcranPrincipalComponent } from './features/ecran-principal/ecran-principal.component';


const routes: Routes = [
  {path: PATH_ECRAN_PRINCIPAL, component: EcranPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
