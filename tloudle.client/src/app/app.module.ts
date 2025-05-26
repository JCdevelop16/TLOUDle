import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Router } from '@angular/router'

//Componentes
import { InicioComponent } from './Componentes/Inicio/inicio.component';
import { CabeceraComponent } from './Componentes/cabecera/cabecera.component';
import { VerPersonajesComponent } from './Componentes/verpersonajes/verpersonajes.component';
import { PersonajeComponent } from './Componentes/personaje/personaje.component';
import { JugarComponent } from './Componentes/Jugar/jugar.component';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InstruccionesComponent } from './Componentes/Instrucciones/instrucciones.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    VerPersonajesComponent,
    InstruccionesComponent,
    PersonajeComponent,
    JugarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatTooltipModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
