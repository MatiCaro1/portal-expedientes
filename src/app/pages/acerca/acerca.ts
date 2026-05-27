import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-acerca',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './acerca.html',
  styleUrl: './acerca.css',
})
export class Acerca {}