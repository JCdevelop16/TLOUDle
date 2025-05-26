import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../Services/personajes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Personajes } from '../../Interfaces/personajes';

@Component({
  selector: 'app-personaje',
  standalone: false,
  templateUrl: './personaje.component.html',
  styleUrl: './personaje.component.css'
})

export class PersonajeComponent implements OnInit{

  id: number;
  personaje!: Personajes;

  constructor(private router: Router, private personajeService: PersonajesService, private aRoute: ActivatedRoute) {
    //Obtiene el id de la url que se seleciona en la antrerior pagina para hacer la llamada al obtenrpersonaje
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    
  }

  //Al inicarse hace las funciones
  ngOnInit(): void {
    this.obtenerPersonaje();
  }

  //Obtiene el personaje con el id en personaje sservice
  obtenerPersonaje() {
    this.personajeService.getPersonajeId(this.id).subscribe(data => {
      this.personaje = data;
      console.log(this.personaje)

    })
  }
  //Funcion par avoler
  volver() {
    this.router.navigate(['/verpersonajes']);
  }

}
