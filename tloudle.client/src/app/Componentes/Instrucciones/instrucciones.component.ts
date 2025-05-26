import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrucciones',
  standalone: false,
  templateUrl: './instrucciones.component.html',
  styleUrl: './instrucciones.component.css'
})

export class InstruccionesComponent {

  constructor(private router: Router) { }

}
