export interface Expediente {
  id: number;
  numero: string;
  estado: string;
  fechaCreacion: string;
  prioridad: string;
  observaciones: string; // Campo opcional para futuras mejoras
}
