import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  constructor (private route: ActivatedRoute){}


  ngOnInit() {
    this.idExpediente = Number(this.route.snapshot.paramMap.get('id'));

    let expedientes: Expediente[] = [];
    const data = localStorage.getItem('expedientes');

    if (data) {
      expedientes = JSON.parse(data);
    } else {
      // Datos iniciales por defecto (deben coincidir con los de Bandeja)
      expedientes = [
        { id: 1, numero: 'EXP-001', estado: 'En Proceso', fechaCreacion: '2024-01-01', prioridad: 'Alta' },
        { id: 2, numero: 'EXP-002', estado: 'Finalizado', fechaCreacion: '2024-02-01', prioridad: 'Media' },
        { id: 3, numero: 'EXP-003', estado: 'Pendiente', fechaCreacion: '2024-03-01', prioridad: 'Baja' }
      ];
    }

    this.expediente = expedientes.find(e => e.id === this.idExpediente);
  }

obtenerClasePrioridad(prioridad: string): string {
   const clases: Record<string, string> = {
     'Alta':  'prioridad-alta',
     'Media': 'prioridad-media',
     'Baja':  'prioridad-baja'
   };
   // Retorna la clase encontrada o un string vacío si la prioridad no existe en el diccionario
   return clases[prioridad] || '';
  }





}
