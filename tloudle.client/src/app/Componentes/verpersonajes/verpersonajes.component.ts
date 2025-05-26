import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personajes } from '../../Interfaces/personajes';
import { PersonajesService } from '../../Services/personajes.service';


@Component({
  selector: 'app-verpersonajes',
  standalone: false,
  templateUrl: './verpersonajes.component.html',
  styleUrl: './verpersonajes.component.css'
})


export class VerPersonajesComponent implements OnInit {

  personajes: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private personajeService: PersonajesService) {

  }

  ngOnInit() {
    this.obtenerpersonaje();
  }

  //Nombre de las columnas d el a tabla
  displayedColumns = ['nombre', 'altura', 'edad', 'sexo', 'pelo', 'juego', 'tipo', 'estado', 'acciones'];
  
  //Funcion volver
  volver() {
    this.router.navigate(['/inicio']);
  }

  //Obtiene los personajes desde personajes service
  obtenerpersonaje() {
    this.personajeService.getPersonaje().subscribe({
      next: (data) => {
        this.personajes = data;
        console.log("Personajes obtenidos: ", this.personajes)
        
      },
      error: (err) => console.error("Error en la consulta: ", err)
    })
  }
}


