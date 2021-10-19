import { Injectable } from '@angular/core';
import { Estudio } from './estudio';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  estudios: Estudio[] = [];
  
  constructor() { }

  agregarEstudios(estudio : Estudio){
    this.estudios.push(estudio);
  }

  obtenerEstudios(){
    return this.estudios;
  }

  borrarEstudios(){
    this.estudios = [];
    return this.estudios;
  }

  borrarEstudio(item : any, arreglo :any){
    var i = arreglo.indexOf(item);

    if (i !== -1) {
      arreglo.splice(i,1)
    }
    
  }

  
}
