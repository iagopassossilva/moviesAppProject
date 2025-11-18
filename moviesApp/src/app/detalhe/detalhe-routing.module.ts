import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'detalhe/:id',
    loadChildren: () => import('./detalhe.module').then( m => m.DetalhePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhePageRoutingModule {}
