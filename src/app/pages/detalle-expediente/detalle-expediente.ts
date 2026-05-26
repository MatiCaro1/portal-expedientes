import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../service/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  constructor (private route: ActivatedRoute, private expedienteService: ExpedienteService){}


  ngOnInit() {
    this.idExpediente = Number(this.route.snapshot.paramMap.get('id'));

    this.expediente = this.expedienteService.obtenerPorId(this.idExpediente);

    if (!this.expediente) {
      alert('Expediente no encontrado.');
    }
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

