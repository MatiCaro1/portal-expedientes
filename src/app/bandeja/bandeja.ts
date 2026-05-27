import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';
import { RouterLink } from '@angular/router';
import { ExpedienteService } from '../service/expediente';
import { DatePipe, NgClass } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-bandeja',
  imports: [
    FormsModule,
    RouterLink,
    DatePipe,
    NgClass,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit {
  expedientes: Expediente[] = [];

  columnasTabla: string[] = [
    'numero', 'estado', 'prioridad', 'fechaCreacion', 'fechaVencimiento', 'observaciones', 'acciones'
  ];

  nuevoExpediente: Expediente = {
    id: 0,
    numero: '',
    estado: '',
    fechaCreacion: '',
    fechaVencimiento: '',
    prioridad: '',
    observaciones: '',
  };

  filtroEstado: string = '';
  filtroPrioridad: string = '';

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit() {
    this.cargarExpedientes();
  }

  cargarExpedientes() {
    this.expedientes = this.expedienteService.obtenerExpedientes();
  }

  agregarExpediente() {
    if (!this.nuevoExpediente.numero || !this.nuevoExpediente.estado || !this.nuevoExpediente.fechaCreacion || !this.nuevoExpediente.fechaVencimiento || !this.nuevoExpediente.prioridad) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const expediente: Expediente = {
      id: Date.now(),
      numero: this.nuevoExpediente.numero,
      estado: this.nuevoExpediente.estado,
      fechaCreacion: this.nuevoExpediente.fechaCreacion,
      fechaVencimiento: this.nuevoExpediente.fechaVencimiento,
      prioridad: this.nuevoExpediente.prioridad,
      observaciones: this.nuevoExpediente.observaciones,
    };

    this.expedienteService.agregarExpediente(expediente);
    this.cargarExpedientes();
    this.limpiarFormulario();
  }

  eliminarExpediente(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este expediente?')) {
      this.expedienteService.eliminarExpediente(id);
      this.cargarExpedientes();
    }
  }

  actualizarEstado(expediente: Expediente) {
    const estados = ['Pendiente', 'En Proceso', 'Finalizado'];
    const indiceActual = estados.indexOf(expediente.estado);
    const siguienteIndice = (indiceActual + 1) % estados.length;
    expediente.estado = estados[siguienteIndice];
    this.expedienteService.actualizarExpediente(expediente);
    this.cargarExpedientes();
  }

  limpiarFormulario() {
    this.nuevoExpediente = {
      id: 0,
      numero: '',
      estado: '',
      fechaCreacion: '',
      fechaVencimiento: '',
      prioridad: '',
      observaciones: '',
    };
  }

  obtenerExpedientesFiltrados() {
    return this.expedientes.filter(expediente => {
      const cumpleEstado = !this.filtroEstado || expediente.estado === this.filtroEstado;
      const cumplePrioridad = !this.filtroPrioridad || expediente.prioridad === this.filtroPrioridad;
      return cumpleEstado && cumplePrioridad;
    });
  }

  limpiarFiltros() {
    this.filtroEstado = '';
    this.filtroPrioridad = '';
  }

  calcularEstadoVencimiento(fechaVencimiento: string): string {
    if (!fechaVencimiento) return '';
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaFin = new Date(fechaVencimiento);
    fechaFin.setHours(0, 0, 0, 0);
    const diferenciaDias = Math.ceil((fechaFin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    if (diferenciaDias < 0) return 'vencimiento-vencido';
    if (diferenciaDias <= 3) return 'vencimiento-proximo';
    return 'vencimiento-vigente';
  }
}