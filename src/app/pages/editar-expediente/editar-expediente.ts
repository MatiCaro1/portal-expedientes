import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../service/expediente';


@Component({
  selector: 'app-editar-expediente',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {

  expediente: Expediente = {
    id: 0,
    numero: '',
    estado: '',
    fechaCreacion: '',
    prioridad: '',
    observaciones: '',
  };
  mensajeError = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expedienteService: ExpedienteService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    const expedienteEncontrado = this.expedienteService.obtenerPorId(id);


    if (expedienteEncontrado) {
      this.expediente = expedienteEncontrado;
    } else {
      this.mensajeError = 'Expediente no encontrado.';
    }
  }

   guardarCambios() {
    // Validación
    if (!this.expediente.numero || !this.expediente.estado || !this.expediente.prioridad || !this.expediente.fechaCreacion || !this.expediente.observaciones) {
      this.mensajeError = 'Por favor, complete todos los campos.';
      return;
    }
    this.expedienteService.actualizarExpediente(this.expediente);
    alert('Cambios guardados con éxito.');
    this.router.navigate(['/bandeja']);
  }
}
