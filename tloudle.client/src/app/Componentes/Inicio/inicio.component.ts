import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InstruccionesComponent } from '../Instrucciones/instrucciones.component';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  constructor(private router: Router) { }

  //Función para ir a la página de ver personajes
  verPersonajes() {
    this.router.navigate(['/verpersonajes'])
  }

  /*Injectar el desplegable de matDialog*/
  readonly dialog = inject(MatDialog);

  /*Esto hace que cuando se haga click en el boton se despliegue una pequeñá ventana */
  /*Ventana que esta definida en un componete */
  openDialog() {
    const dialogRef = this.dialog.open(InstruccionesComponent, {
      panelClass: 'borde-instrucciones',
      backdropClass: 'fondo-instrucciones'
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /*Funcion para ir a la opción de jugar con un alert para que antes de ir salga el aviso */
  jugar() {
    alert("ADVERTENCIA: Este juego contiene spoilers juega bajo tu propia responsabilidad");
  this.router.navigate(['/jugar']); // Redirige a la pantalla de juego
    
  }
  


}
