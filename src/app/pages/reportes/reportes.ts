import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from '../../service/expediente';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reportes',
  imports: [MatCardModule, MatIconModule],
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
