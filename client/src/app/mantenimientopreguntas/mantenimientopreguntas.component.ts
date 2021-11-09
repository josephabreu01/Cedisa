import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { pregunta } from '../servicios/preguntas/pregunta';
import { PreguntasService } from '../servicios/preguntas/preguntas.service';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mantenimientopreguntas',
  templateUrl: './mantenimientopreguntas.component.html',
  styleUrls: ['./mantenimientopreguntas.component.scss']
})
export class MantenimientopreguntasComponent implements OnInit {


  habailitar: boolean = false;
  preguntas: any = [];
  nuevaPregunta: any = {
    pregunta: '',
    respuesta: '',
    si: false,
    no:false,
    // nombrePaciente:string,
    // cedula:string,
    // estudio:string,
    // fechaCita: Date,
    grupo: '',
    orden: 0

  };

  constructor(
    private preguntasService: PreguntasService,
    private rest: ResApiService,
    private notificacion: NotificationService,
    private modalService: NgbModal

  ) { }

  async ngOnInit() {
    await this.obtenerPreguntas()

  }

  async obtenerPreguntas() {
    let data: any = await this.rest.get('api/preguntas')

    data['success']
      ? (this.preguntas = data.preguntas, this.notificacion.showInfo('', 'Preguntas cargadas'))
      : this.notificacion.showError('', 'Preguntas no cargadas')
  }



  async guardarPregunta(pregunta: any) {
    if (pregunta._id) {
      const data: any = await this.rest.post('api/preguntas', pregunta);
      this.habailitar = false;
      data['success']
        ? this.notificacion.showSuccess('', 'Pregunta Guardada')
        : this.notificacion.showError('', 'Pregunta No Guardada')
    } else {
      const data: any = await this.rest.post('api/preguntas', this.nuevaPregunta);
      this.habailitar = false;
      data['success']
        ? this.notificacion.showSuccess('', 'Pregunta Guardada')
        : this.notificacion.showError('', 'Pregunta No Guardada')
    }
    window.scroll(0,0);


    this.preguntasService.limpiarPreguntas();
    this.obtenerPreguntas();
  }

 

  editarPregunta(pregunta: any) {

    this.habailitar = true;
    this.nuevaPregunta = Object.assign({}, pregunta);
    
    let element = document.getElementById("editarPregunta");
    element?.scrollIntoView(true)
    
    // this.guardarPregunta(this.nuevaPregunta, 0);


  }



  agregarPregunta() {

    if (this.preguntas.length) {
      let orden = this.preguntas[this.preguntas.length - 1]

      this.nuevaPregunta.orden = orden.orden + 1;
      this.nuevaPregunta.pregunta = 'Escriba aqui su pregunta'
      this.nuevaPregunta._id = '';
      this.guardarPregunta(this.nuevaPregunta);

    } else {

      this.nuevaPregunta.pregunta = 'Escriba aqui su pregunta'
      this.nuevaPregunta.orden =  1;
      this.nuevaPregunta._id = '';
      this.guardarPregunta(this.nuevaPregunta);
    }

    this.preguntasService.limpiarPreguntas();

  }

  async borrarPregunta() {
    let orden = this.preguntas[0]
    let ultimaPregunta = this.preguntas[this.preguntas.length - 1]

    const data: any = await this.rest.delete(
      `api/preguntas/${ultimaPregunta._id}`
    )

    data['success']
      ? (this.obtenerPreguntas(), this.notificacion.showWarning('', 'Pregunta eliminada'))
      : this.notificacion.showError('', 'Error al eliminar pregunta');

    this.preguntas.forEach((pregunta: any) => {
      pregunta.orden = orden.orden++;
    });

    for (let index = 0; index < this.preguntas.length; index++) {
      this.preguntas[index].orden = index;
    }
  }

}
