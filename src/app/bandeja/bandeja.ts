import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';
import { RouterLink } from '@angular/router';
import { ExpedienteService } from '../service/expediente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bandeja',
  imports: [FormsModule, RouterLink, DatePipe],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit {
  // Lista que almacena todos los expedientes mostrados en la tabla
  expedientes: Expediente[] = [];

  // Objeto vinculado al formulario para capturar los datos del nuevo expediente
  nuevoExpediente: Expediente = {
    id: 0,
    numero: '',
    estado: '',
    fechaCreacion: '',
    prioridad: '',
    observaciones: '',
  };

  // Variables para el filtrado
  filtroEstado: string = '';
  filtroPrioridad: string = '';

  constructor(private expedienteService: ExpedienteService) {}



  /**
   * Se ejecuta al iniciar el componente.
   * Intenta cargar los datos desde LocalStorage o usa datos de prueba si está vacío.
   */
  ngOnInit() {
   this.cargarExpedientes();
  }

  cargarExpedientes() {
    this.expedientes = this.expedienteService.obtenerExpedientes();
  }

  /**
   * Valida y agrega un nuevo expediente a la lista.
   */
  agregarExpediente() {
    // Validación básica: todos los campos son obligatorios
    if (!this.nuevoExpediente.numero || !this.nuevoExpediente.estado || !this.nuevoExpediente.fechaCreacion || !this.nuevoExpediente.prioridad) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Creamos el nuevo objeto con un ID único basado en la marca de tiempo
    const expediente: Expediente = {
      id: Date.now(),
      numero: this.nuevoExpediente.numero,
      estado: this.nuevoExpediente.estado,
      fechaCreacion: this.nuevoExpediente.fechaCreacion,
      prioridad: this.nuevoExpediente.prioridad,
      observaciones: this.nuevoExpediente.observaciones,
    };

    // Añadimos mediante el servicio y refrescamos la lista
    this.expedienteService.agregarExpediente(expediente);
    this.cargarExpedientes();
    this.limpiarFormulario();
  }


  eliminarExpediente(id: number) {
    // Solicitamos confirmación del usuario
    if (confirm('¿Está seguro de que desea eliminar este expediente?')) {
      this.expedienteService.eliminarExpediente(id);
      this.cargarExpedientes();
    }
  }

  /**
   * Cambia el estado del expediente al siguiente en la secuencia:
   * Pendiente -> En Proceso -> Finalizado -> (vuelve a Pendiente)
   */
  actualizarEstado(expediente: Expediente) {
    const estados = ['Pendiente', 'En Proceso', 'Finalizado'];
    const indiceActual = estados.indexOf(expediente.estado);

    // Calculamos el siguiente índice (si es el último, vuelve al primero)
    const siguienteIndice = (indiceActual + 1) % estados.length;
    expediente.estado = estados[siguienteIndice];

    // Guardamos los cambios mediante el servicio
    this.expedienteService.actualizarExpediente(expediente);
    this.cargarExpedientes();
  }

  /**
   * Reinicia el objeto nuevoExpediente para vaciar los campos del formulario.
   */
  limpiarFormulario() {
    this.nuevoExpediente = {
      id: 0,
      numero: '',
      estado: '',
      fechaCreacion: '',
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
}
