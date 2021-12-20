import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';
import { PreguntasService } from '../servicios/preguntas/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  preguntas: Array<any> = [];
  verResultadoPreguntas: Boolean = false;
  
  constructor(
    private preguntasService : PreguntasService,
    private notificacion : NotificationService,
    private rest : ResApiService
    
  ) { }

  ngOnInit(): void {
    this.obtenerPreguntas()
  }

  public scroll(element: any) {
    return window.scrollTo(0, element);
  }
  async obtenerPreguntas() {
    if (this.preguntasService.obteneterPreguntas().length) {
      this.preguntas = this.preguntasService.obteneterPreguntas();
    } else {
      try {
        let data: any = await this.rest.get('api/preguntas');

        data['success']
          ? (this.preguntas = data['preguntas'])
          : this.notificacion.showError('Preguntas no encontradas', 'ERROR');
      } catch (error) {
        this.notificacion.showError(error, 'ERROR');
      }
    }
  }

  repuestas(pregunta: any, index: any) {
    this.preguntas[index] = pregunta;

    this.preguntasService.guardarPreguntas(this.preguntas);

    console.log(this.preguntasService.obteneterPreguntas());
  }

  resultadosPreguntas() {
    confirm('Desea terminar el cuestionario?')
      ? ((this.verResultadoPreguntas = true), this.scroll(0))
      : (this.verResultadoPreguntas = false);
  }

  terminarCuestionario() {
    if (confirm('Desea terminar?')) {
      this.preguntas = this.preguntasService.limpiarPreguntas();
      this.verResultadoPreguntas = false;
      this.obtenerPreguntas();
      this.scroll(0);
    }
  }
}
