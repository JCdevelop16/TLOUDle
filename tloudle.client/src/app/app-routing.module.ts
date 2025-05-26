import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { InicioComponent } from './Componentes/Inicio/inicio.component';
import { VerPersonajesComponent } from './Componentes/verpersonajes/verpersonajes.component';
import { PersonajeComponent } from './Componentes/personaje/personaje.component';
import { JugarComponent } from './Componentes/Jugar/jugar.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'verpersonajes', component: VerPersonajesComponent },
  { path: 'personaje/:id', component: PersonajeComponent },
  { path: 'jugar', component: JugarComponent},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
