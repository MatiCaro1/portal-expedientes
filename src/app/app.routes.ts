import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Bandeja } from './bandeja/bandeja';
import { Acerca } from './pages/acerca/acerca';
import { Reportes } from './pages/reportes/reportes';
import { DetalleExpediente } from './pages/detalle-expediente/detalle-expediente';
import { EditarExpediente } from './pages/editar-expediente/editar-expediente';
import { Pendientes } from './pages/pendientes/pendientes';
import { ProximosVencerComponent } from './pages/proximos-vencer/proximos-vencer';
import { Kanban } from './pages/kanban/kanban';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'bandeja', component: Bandeja },
  { path: 'acerca', component: Acerca },
  { path: 'reportes', component: Reportes },
  { path: 'detalle-expediente/:id', component: DetalleExpediente },
  { path: 'expedientes/editar/:id', component: EditarExpediente },
  { path: 'pendientes', component: Pendientes },
  { path: 'proximos-a-vencer', component: ProximosVencerComponent },
  { path: 'kanban', component: Kanban },
  { path: '**', redirectTo: 'inicio' }

];
