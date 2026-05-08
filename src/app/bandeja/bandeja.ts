import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';

@Component({
  selector: 'app-bandeja',
  imports: [FormsModule],
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
  };

  /**
   * Se ejecuta al iniciar el componente.
   * Intenta cargar los datos desde LocalStorage o usa datos de prueba si está vacío.
   */
  ngOnInit() {
    const data = localStorage.getItem('expedientes');
    if (data) {
      this.expedientes = JSON.parse(data);
    } else {
      // Datos iniciales de ejemplo si no hay nada guardado
      this.expedientes = [
        { id: 1, numero: 'EXP-001', estado: 'En Proceso', fechaCreacion: '2024-01-01', prioridad: 'Alta' },
        { id: 2, numero: 'EXP-002', estado: 'Finalizado', fechaCreacion: '2024-02-01',prioridad: 'Media' },
        { id: 3, numero: 'EXP-003', estado: 'Pendiente', fechaCreacion: '2024-03-01', prioridad: 'Baja'}
      ];
    }
  }

  /**
   * Valida y agrega un nuevo expediente a la lista.
   */
  agregarExpediente() {
    // Validación básica: todos los campos son obligatorios
    if (!this.nuevoExpediente.numero || !this.nuevoExpediente.estado || !this.nuevoExpediente.fechaCreacion) {
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
    };

    // Añadimos a la lista, guardamos en memoria local y limpiamos los inputs
    this.expedientes.push(expediente);
    this.guardarLocalStorage();
    this.limpiarFormulario();
  }


  eliminarExpediente(id: number) {
    // Solicitamos confirmación del usuario
    if (confirm('¿Está seguro de que desea eliminar este expediente?')) {
      // Filtramos el array para excluir el elemento con el ID proporcionado
      this.expedientes = this.expedientes.filter(e => e.id !== id);
      // Actualizamos el almacenamiento persistente
      this.guardarLocalStorage();
    }
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
    };
  }

  /**
   * Persiste la lista actual de expedientes en el LocalStorage del navegador.
   */
  guardarLocalStorage() {
    localStorage.setItem('expedientes', JSON.stringify(this.expedientes));
  }
}
