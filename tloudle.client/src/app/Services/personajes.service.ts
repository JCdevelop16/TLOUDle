import { Injectable } from "@angular/core";
import { environment } from "../Environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Personajes } from "../Interfaces/personajes";


@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  //Link conexion backend en environment
  private myAppUrl: string = environment.myAppUrl;

  constructor(private http: HttpClient) { }
  //Funcion obtener personajes en general
  getPersonaje(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/Personaje/personajes`);
  }
  //Funcion obtenber personajes por ID
  getPersonajeId(id: number): Observable<Personajes> {
    return this.http.get<Personajes>(`${this.myAppUrl}/VerPersonaje/${id}`);
  }
}
