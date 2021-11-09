import { Injectable } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { ResApiService } from 'src/app/res-api.service';
import { pregunta } from './pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  preguntas: pregunta[] = []

  constructor(
    private rest: ResApiService,
    private notificacion: NotificationService
  ) { }



  limpiarPreguntas() {
     this.preguntas = [];
     return this.preguntas;
  }

  guardarPreguntas(pregunta: any) {
    this.preguntas = [...pregunta];

  }

  obteneterPreguntas() {
    return this.preguntas
  }
}
