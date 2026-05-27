import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpedienteService } from '../../service/expediente';
import { Expediente } from '../../../models/expediente';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-proximos-vencer',
  imports: [DatePipe, RouterLink, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './proximos-vencer.html',
  styleUrl: './proximos-vencer.css'
})
export class ProximosVencerComponent implements OnInit {
  expedientes: Expediente[] = [];

  columnas: string[] = ['numero', 'estado', 'prioridad', 'fechaVencimiento', 'acciones'];

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit(): void {
    this.expedientes = this.expedienteService.getExpedientesProximosAVencer();
  }
}
