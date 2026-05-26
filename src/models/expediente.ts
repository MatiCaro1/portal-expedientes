export interface HistorialEstado {
  fecha: string;
  estadoAnterior: string;
  nuevoEstado: string;
  observacion: string;
}

export interface Expediente {
  id: number;
  numero: string;
  estado: string;
  fechaCreacion: string;
  prioridad: string;
  observaciones: string;
  historial?: HistorialEstado[];
}
