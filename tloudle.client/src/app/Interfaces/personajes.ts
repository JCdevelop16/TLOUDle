//Interfaz Para la tabal de perosnajes
export interface Personajes {
  id?: number,
  nombre?: string,
  altura: number,
  edad?: number,
  sexo: string,
  colorPelo: string,
  juegos?: number,
  tipoPersonaje: string,
  estado: string,
  descripcion: string,
  foto: string
}
