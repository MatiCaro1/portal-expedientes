import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedienteService } from '../../service/expediente';

@Component({
  selector: 'app-reportes',
  standalone: true, // Indica que el componente es independiente y maneja sus propias importaciones
  imports: [CommonModule], // Importamos CommonModule para usar funciones básicas de Angular
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  totalGeneral = 0;
  totalPendientes = 0;
  totalEnProceso = 0;
  totalFinalizados = 0;

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit() {
    this.totalGeneral = this.expedienteService.contarTotal();
    this.totalPendientes = this.expedienteService.contarPendientes();
    this.totalEnProceso = this.expedienteService.contarEnProceso();
    this.totalFinalizados = this.expedienteService.contarFinalizados();
  }
}


