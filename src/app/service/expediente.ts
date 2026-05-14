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
      { id: 1, numero: 'EXP-001', estado: 'En Proceso', fechaCreacion: '2024-01-01', prioridad: 'Alta', observaciones:'' },
      { id: 2, numero: 'EXP-002', estado: 'Finalizado', fechaCreacion: '2024-02-01',prioridad: 'Media', observaciones:'' },
      { id: 3, numero: 'EXP-003', estado: 'Pendiente', fechaCreacion: '2024-03-01', prioridad: 'Baja', observaciones:'' }
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

  actualizarExpediente(expediente: Expediente): void {
    const expedientes = this.obtenerExpedientes();

    const expedientesActualizados: Expediente[] = expedientes.map(e => {
      if (e.id === expediente.id) {
        return expediente;
      }
      return e;
    });

    this.guardarExpedientes(expedientesActualizados);
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


}
