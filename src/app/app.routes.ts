import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Bandeja } from './bandeja/bandeja';
import { Acerca } from './pages/acerca/acerca';
import { Reportes } from './pages/reportes/reportes';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'bandeja', component: Bandeja },
  { path: 'acerca', component: Acerca },
  { path: 'reportes', component: Reportes },
  { path: '**', redirectTo: 'inicio' }
];
