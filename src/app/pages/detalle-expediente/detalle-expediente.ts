import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../service/expediente';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink, DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatDividerModule],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  historialColumnas: string[] = ['fecha', 'estadoAnterior', 'nuevoEstado', 'observacion'];

  constructor(private route: ActivatedRoute, private expedienteService: ExpedienteService) {}

  ngOnInit() {
    this.idExpediente = Number(this.route.snapshot.paramMap.get('id'));
    this.expediente = this.expedienteService.obtenerPorId(this.idExpediente);
    if (!this.expediente) {
      alert('Expediente no encontrado.');
    }
  }

  obtenerClasePrioridad(prioridad: string): string {
    const clases: Record<string, string> = {
      'Alta':  'prioridad-alta',
      'Media': 'prioridad-media',
      'Baja':  'prioridad-baja'
    };
    return clases[prioridad] || '';
  }
}
