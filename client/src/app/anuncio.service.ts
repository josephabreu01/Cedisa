import { Injectable } from '@angular/core';
import { Anuncio } from './anuncio';
@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  anuncio: Anuncio[] = []
  constructor() { }

  limpiar() {

    this.anuncio = [];
    return this.anuncio
  }

  agregar(anuncio: Anuncio) {
    this.anuncio.push(anuncio);
  }

  obtener() {
    return this.anuncio
  }

}
