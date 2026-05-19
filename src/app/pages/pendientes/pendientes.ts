import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from '../../service/expediente';
import { Expediente } from '../../../models/expediente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pendientes',
  imports: [DatePipe],
  templateUrl: './pendientes.html',
  styleUrl: './pendientes.css',
})
export class Pendientes implements OnInit{

  // Tu lista vacía al inicio
  expedientesPendientes: Expediente[] = [];

  // Inyectamos el servicio para obtener los expedientes pendientes
  constructor(private expedienteService: ExpedienteService) {}

  // Al iniciar el componente, obtenemos los expedientes pendientes
  ngOnInit() {
    this.expedientesPendientes = this.expedienteService.obtenerPendientes();
    console.log(this.expedientesPendientes);

  }
}
