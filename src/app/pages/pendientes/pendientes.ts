import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from '../../service/expediente';
import { Expediente } from '../../../models/expediente';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pendientes',
  imports: [DatePipe, MatCardModule, MatIconModule],
  templateUrl: './pendientes.html',
  styleUrl: './pendientes.css',
})
export class Pendientes implements OnInit {
  expedientesPendientes: Expediente[] = [];

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit() {
    this.expedientesPendientes = this.expedienteService.obtenerPendientes();
  }

  esProximoAVencer(fechaVencimiento: string): boolean {
    if (!fechaVencimiento) return false;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaVencimiento);
    fecha.setHours(0, 0, 0, 0);
    const dias = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return dias >= 0 && dias <= 7;
  }
}
