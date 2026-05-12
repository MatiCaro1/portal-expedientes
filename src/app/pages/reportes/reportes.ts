import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-reportes',
  standalone: true, // Indica que el componente es independiente y maneja sus propias importaciones
  imports: [CommonModule], // Importamos CommonModule para usar funciones básicas de Angular
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {
  // Definimos un array vacío donde guardaremos los expedientes que recuperemos
  expedientes: Expediente[] = [];

  /**
   * ngOnInit es un "gancho" (hook) que se ejecuta automáticamente
   * apenas el componente se carga en la pantalla.
   */
  ngOnInit() {
    // PASO 1: Recuperar los datos guardados por el componente 'Bandeja'
    // localStorage es como una pequeña base de datos en tu navegador que no se borra al refrescar
    const data = localStorage.getItem('expedientes');

    if (data) {
      // Como en el "baúl" se guarda todo como texto plano, usamos JSON.parse
      // para convertir ese texto de nuevo en una lista de objetos (Array)
      this.expedientes = JSON.parse(data);
    }
  }

  /**
   * PASO 2: Crear "Getters" para los totales.
   * Un 'get' es una función especial que se puede usar en el HTML como si fuera una variable.
   * Angular la recalculará automáticamente si los datos cambian.
   */

  // Contamos los pendientes
  get totalPendientes() {
    // .filter crea una lista temporal solo con los que cumplen la condición
    // .length nos dice cuántos elementos hay en esa lista temporal
    return this.expedientes.filter(e => e.estado === 'Pendiente').length;
  }

  // Contamos los que están en proceso
  get totalEnProceso() {
    return this.expedientes.filter(e => e.estado === 'En Proceso').length;
  }

  // Contamos los finalizados
  get totalFinalizados() {
    return this.expedientes.filter(e => e.estado === 'Finalizado').length;
  }

  // Obtenemos el total de la lista completa sin filtrar
  get totalGeneral() {
    return this.expedientes.length;
  }
}
