import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InstruccionesComponent } from '../Instrucciones/instrucciones.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonajesService } from '../../Services/personajes.service';
import { Observable, startWith, map } from 'rxjs';
import { Personajes } from '../../Interfaces/personajes';



@Component({
  selector: 'app-jugar',
  standalone: false,
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.css'
})

export class JugarComponent implements OnInit {

  //Variables
  myControl = new FormControl<string>('');
  filteredOptions: Observable<string[]> | undefined;
  personajes: any[] = [];
  nombrePersonajes: string[] = [];
  personajeSeleccionados: Personajes[] = [];
  intentos: Personajes[] = []; // ✅ Lista de intentos
  personajeObjetivo!: Personajes; // ✅ Personaje a adivinar
  partidaTerminada: boolean = false
  options: string[] = [];
   


  constructor(private router: Router, private personajeService: PersonajesService) {

  }

  //Funcion que hace que todo lo quye este adentro se haga al ainicarse
  ngOnInit() {
   
    this.obtenerpersonaje();
   
    // filtra las opciones del input
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.iniciarPartida();
    
  }

  //Funcion para que la partidfa se inice
  iniciarPartida() {
    this.obtenerpersonaje();
    this.intentos = []; // Borra los intentos al empezar por si los hubiese
    this.partidaTerminada = false; //Reinicia estado de juego
    
  }

  //Funcion que escoge el personaje a adivinar
 elegirPersonajeSecreto() {
  if (this.personajes.length === 0) {
    console.error("Error: La lista de personajes está vacía. No se puede elegir personaje objetivo.");
    return;
  }
  //Esto lo que hace es escoger un personaje al azar haciendo un random de su indice y el floor redondea por si acaso
   const randomIndex = Math.floor(Math.random() * this.personajes.length);
  //Accede al personaje random
  this.personajeObjetivo = this.personajes[randomIndex];

  console.log("Personaje a adivinar:", this.personajeObjetivo);
}


//Funcion para registrar los intentos de adivinar el personaje
  registrarIntento(nombre: string | null) {
    if (!nombre || this.partidaTerminada) return; // ✅ Evita intentos inválidos

    //Con el nombre ingresado busca el personaje qu eccoincida
    const personajeIntento = this.personajes.find(p => p.nombre === nombre);

    if (!personajeIntento) {
      console.error("Error: No se encontró el personaje con nombre", nombre); // ✅ Depuración en consola
      return; //Evita errores si el personaje no existe
    }

    if (this.intentos.length >= 8) return;

    this.intentos.push(personajeIntento);
    this.myControl.setValue(''); //Limpia el input después de elegir

    //Verifica si el jugador ha adivinado el personaje antes de acceder a sus propiedades
    if (personajeIntento.nombre && this.personajeObjetivo?.nombre && personajeIntento.nombre === this.personajeObjetivo.nombre) {
      this.partidaTerminada = true;
      console.log("¡Adivinaste! El personaje correcto es:", personajeIntento);
    } else if (this.intentos.length === 8) {
      this.partidaTerminada = true;
      console.log("Se acabaron los intentos. El personaje objetivo era:", this.personajeObjetivo);
    }

    console.log("Intentos registrados:", this.intentos);
  }


  //Qu ecompara las caracteristicas de los personajes par ver si coinciden
  esCoincidencia(valor: any, propiedad: keyof Personajes): boolean {
    return valor === this.personajeObjetivo[propiedad];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //Fucnion que obtiene los personajes conectandose con personajes servicews que se ocnecta al backens
obtenerpersonaje() {
  this.personajeService.getPersonaje().subscribe({
    next: (data) => {
      this.personajes = data;
      console.log("Personajes obtenidos:", this.personajes); // ✅ Verifica si hay datos
      this.options = this.personajes.map(personaje => personaje.nombre);
      if (this.personajes.length > 0) {
        this.elegirPersonajeSecreto(); // ✅ Solo elegimos si hay personajes
      } else {
        console.error("Error: No se han recibido personajes desde el servicio.");
      }
    },
    error: (err) => console.error("Error en la consulta:", err)
  });
}

//Funcion que permite al ususario tener 8 intentos y los agrega en la tabla en html
  seleccionarPersonaje(nombre: string) {
    const personajeSeleccionado = this.personajes.find(p => p.nombre === nombre);

    if (personajeSeleccionado && this.personajeSeleccionados.length < 8) {
      this.personajeSeleccionados.push(personajeSeleccionado); // Agregar el personaje a la tabla
      this.myControl.setValue(''); // Limpiar el input después de elegir
    }
  }

  //Funcion para volver
  volver(event: any) {
    this.router.navigate(["/inicio"]);
  }

}
