import { Injectable } from '@angular/core';
import { Expediente } from '../../models/expediente';


@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {

  private storageKey = 'expedientes';

  obtenerExpedientes(): Expediente[] {
    const data = localStorage.getItem(this.storageKey);

    if(data) {
      return JSON.parse(data);
    }

    const expedentesIniciales: Expediente[] = [
      { id: 1, numero: 'EXP-001', estado: 'En Proceso', fechaCreacion: '2024-01-01', fechaVencimiento: '2024-06-01', prioridad: 'Alta', observaciones:'' },
      { id: 2, numero: 'EXP-002', estado: 'Finalizado', fechaCreacion: '2024-02-01', fechaVencimiento: '2024-07-01', prioridad: 'Media', observaciones:'' },
      { id: 3, numero: 'EXP-003', estado: 'Pendiente', fechaCreacion: '2024-03-01', fechaVencimiento: '2024-08-01', prioridad: 'Baja', observaciones:'' }
    ];

    this.guardarExpedientes(expedentesIniciales);
    return expedentesIniciales;

  }

  obtenerPorId(id: number): Expediente | undefined {
    const expedientes = this.obtenerExpedientes();
    return expedientes.find(e => e.id === id);
  }

  agregarExpediente(expediente: Expediente): void {
    const expedientes = this.obtenerExpedientes();
    expedientes.push(expediente);
    this.guardarExpedientes(expedientes);
  }

  eliminarExpediente(id: number): void {
    const expedientes = this.obtenerExpedientes();
    this.guardarExpedientes(expedientes.filter(e => e.id !== id));
  }

  actualizarExpediente(expedienteActualizado: Expediente): void {
    const expedientes = this.obtenerExpedientes();
    const index = expedientes.findIndex((e) => e.id === expedienteActualizado.id);

    if (index !== -1) {
      const expedienteAnterior = expedientes[index];

      // Si el estado cambió, registramos en el historial
      if (expedienteAnterior.estado !== expedienteActualizado.estado) {
        // Asegurarse de que el historial exista en el objeto actualizado
        if (!expedienteActualizado.historial) {
          expedienteActualizado.historial = expedienteAnterior.historial || [];
        }

        expedienteActualizado.historial.push({
          fecha: new Date().toISOString(),
          estadoAnterior: expedienteAnterior.estado,
          nuevoEstado: expedienteActualizado.estado,
          observacion: 'Actualizado desde edición',
        });
      }

      expedientes[index] = expedienteActualizado;
      this.guardarExpedientes(expedientes);
    }
  }

  contarTotal(): number {
    return this.obtenerExpedientes().length;
  }

  contarPendientes(): number {
    return this.contarPorEstado('Pendiente');
  }

  contarEnProceso(): number {
    return this.contarPorEstado('En Proceso');
  }

  contarFinalizados(): number {
    return this.contarPorEstado('Finalizado');
  }

  contarPorEstado(estado: string): number {
    return this.obtenerExpedientes().filter(e => e.estado === estado).length;
  }

  guardarExpedientes(expedientes: Expediente[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(expedientes));
  }

  cambiarEstado(id: number, nuevoEstado: string, observacion: string): void {
    const expedientes = this.obtenerExpedientes();
    const index = expedientes.findIndex((e) => e.id === id);

    if (index !== -1) {
      const expediente = expedientes[index];
      const estadoAnterior = expediente.estado;

      // Inicializar historial si no existe
      if (!expediente.historial) {
        expediente.historial = [];
      }

      // Agregar nueva entrada al historial
      expediente.historial.push({
        fecha: new Date().toISOString(),
        estadoAnterior: estadoAnterior,
        nuevoEstado: nuevoEstado,
        observacion: observacion,
      });

      // Actualizar el estado actual
      expediente.estado = nuevoEstado;

      // Guardar cambios
      this.guardarExpedientes(expedientes);
    }
  }

  obtenerPendientes(): Expediente[] {
  //1. Obtener todos los expedientes
  const expedientes = this.obtenerExpedientes();

  //2. Filtrar por estado "Pendiente"
  return expedientes.filter(e => e.estado === 'Pendiente');

  }


}
