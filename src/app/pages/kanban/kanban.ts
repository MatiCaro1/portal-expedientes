import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ExpedienteService } from '../../service/expediente';
import { Expediente } from '../../../models/expediente';

export interface KanbanColumna {
  estado: string;
  label: string;
  icon: string;
  colorClass: string;
  expedientes: Expediente[];
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban implements OnInit {
  columnas = signal<KanbanColumna[]>([
    { estado: 'Pendiente',  label: 'Pendiente',  icon: 'hourglass_empty', colorClass: 'col-pendiente',  expedientes: [] },
    { estado: 'En Proceso', label: 'En Proceso', icon: 'sync',            colorClass: 'col-en-proceso', expedientes: [] },
    { estado: 'Finalizado', label: 'Finalizado', icon: 'check_circle',    colorClass: 'col-finalizado', expedientes: [] },
  ]);

  constructor(private svc: ExpedienteService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const todos = this.svc.obtenerExpedientes();
    this.columnas.update(cols =>
      cols.map(col => ({
        ...col,
        expedientes: todos.filter(e => e.estado === col.estado),
      }))
    );
  }

  mover(expediente: Expediente, estadoDestino: string): void {
    this.svc.cambiarEstado(expediente.id, estadoDestino, `Movido a ${estadoDestino} desde Kanban`);
    this.cargarDatos();
  }

  estadosDestino(estadoActual: string): { label: string; estado: string; icon: string }[] {
    const todos = [
      { label: 'Pendiente',  estado: 'Pendiente',  icon: 'hourglass_empty' },
      { label: 'En Proceso', estado: 'En Proceso', icon: 'sync' },
      { label: 'Finalizado', estado: 'Finalizado', icon: 'check_circle' },
    ];
    return todos.filter(t => t.estado !== estadoActual);
  }

  prioridadClass(prioridad: string): string {
    const map: Record<string, string> = {
      'Alta':  'prioridad-alta',
      'Media': 'prioridad-media',
      'Baja':  'prioridad-baja',
    };
    return map[prioridad] ?? '';
  }

  totalExpedientes(): number {
    return this.columnas().reduce((acc, col) => acc + col.expedientes.length, 0);
  }
}
