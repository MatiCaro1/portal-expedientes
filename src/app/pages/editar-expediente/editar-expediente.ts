import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../service/expediente';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editar-expediente',
  imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {
  expediente: Expediente = {
    id: 0,
    numero: '',
    estado: '',
    fechaCreacion: '',
    fechaVencimiento: '',
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
    const encontrado = this.expedienteService.obtenerPorId(id);
    if (encontrado) {
      this.expediente = encontrado;
    } else {
      this.mensajeError = 'Expediente no encontrado.';
    }
  }

  guardarCambios() {
    if (!this.expediente.numero || !this.expediente.estado || !this.expediente.prioridad || !this.expediente.fechaCreacion || !this.expediente.fechaVencimiento || this.expediente.observaciones.trim() === '') {
      this.mensajeError = 'Por favor, complete todos los campos.';
      return;
    }
    this.expedienteService.actualizarExpediente(this.expediente);
    alert('Cambios guardados con éxito.');
    this.router.navigate(['/bandeja']);
  }
}
