import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-editar-expediente',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente = {
    id: 0,
    numero: '',
    estado: '',
    fechaCreacion: '',
    prioridad: '',
  };
  mensajeError = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idExpediente = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarExpediente();
  }

  cargarExpediente() {
    const data = localStorage.getItem('expedientes');
    if (data) {
      const expedientes: Expediente[] = JSON.parse(data);
      const encontrado = expedientes.find((e) => e.id === this.idExpediente);
      if (encontrado) {
        // Clonamos para no modificar la referencia directamente antes de guardar
        this.expediente = { ...encontrado };
      } else {
        this.mensajeError = 'Expediente no encontrado.';
      }
    } else {
      this.mensajeError = 'No hay datos cargados.';
    }
  }

  guardarCambios() {
    // Validación visual (campos vacíos)
    if (!this.expediente.numero || !this.expediente.estado || !this.expediente.prioridad || !this.expediente.fechaCreacion) {
      this.mensajeError = 'Por favor, complete todos los campos.';
      return;
    }

    const data = localStorage.getItem('expedientes');
    if (data) {
      let expedientes: Expediente[] = JSON.parse(data);
      const index = expedientes.findIndex((e) => e.id === this.idExpediente);

      if (index !== -1) {
        expedientes[index] = { ...this.expediente };
        localStorage.setItem('expedientes', JSON.stringify(expedientes));
        alert('Cambios guardados con éxito.');
        this.router.navigate(['/bandeja']);
      } else {
        this.mensajeError = 'Error al intentar guardar: Expediente no encontrado.';
      }
    }
  }
}
