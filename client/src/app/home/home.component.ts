import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  NgbCarouselConfig,
  NgbNavChangeEvent,
  NgbProgressbarConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';
import { PreguntasService } from '../servicios/preguntas/preguntas.service';
import { HomeServiceService } from './home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  estudios: any;
  busqueda: string = '';
  isCollapsed = -1;
  pagina = 1;
  totalEstudios: number = 0;
  anuncios: Array<any> = [];
  tienenAnuncios: Boolean = true;
  progreso: number = 1;
  active: number = 1;
  tabs: number = 3;
  preguntas: Array<any> = [];
  verResultadoPreguntas: Boolean = false;
  soloInformacion: any = false;

  constructor(
    private data: DataService,
    private rest: ResApiService,
    private carousel: NgbCarouselConfig,
    public progresBar: NgbProgressbarConfig,
    private notificacion: NotificationService,
    private preguntasService: PreguntasService,
    private homeService: HomeServiceService
  ) {
    this.carousel.showNavigationIndicators = false;

    progresBar.max = 10;
    progresBar.striped = true;
    progresBar.animated = true;
    progresBar.type = 'info';
    progresBar.height = '20px';
    progresBar.showValue = true;
  }

  async ngOnInit() {
    await this.obtenerEstudios();
    await this.obtenerAnuncios();
    this.obtenerPreguntas();
    this.soloInformacion = this.homeService.vistaHome();
  }

  public scroll(element: any) {
    return window.scrollTo(0, element);
  }

  get lower() {
    return 10 * (this.pagina - 1) + 1;
  }

  get upper() {
    return Math.min(12 * this.pagina, this.totalEstudios);
  }

  async obtenerEstudios(event?: any) {
    if (event) {
      this.estudios = null;
    }

    try {
      const data: any = await this.rest.get(`api/estudios/${this.pagina - 1}`);
      data['success']
        ? ((this.estudios = data['estudios']),
          (this.totalEstudios = data['totalEstudios']))
        : this.data.error('No se pudieron encontrar los Estudios');

      window.scroll(0, 0);
    } catch (error) {
      // this.data.error(error['message'])
    }
  }

  collapse() {}

  async obtenerAnuncios() {
    try {
      const data: any = await this.rest.get('api/anuncio');
      data['success']
        ? (this.anuncios = data['anuncios'])
        : this.data.error('No se encontraron los anuncios');

      this.anuncios = this.anuncios.filter(
        (anuncio) => anuncio.habilitado === true
      );
      this.tienenAnuncios = this.anuncios.length ? true : false;
    } catch (error) {
      this.data.error('No se encontraron los anuncios');
    }
  }

  closeDropdown() {
    !this.isCollapsed;
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

  cambiarTab() {
    if (this.active === this.tabs) {
      return (this.active = this.tabs);
    } else {
      return this.active + 1;
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

  cambioHome() {
    this.soloInformacion = !this.soloInformacion;
    this.homeService.guardarVista(this.soloInformacion);
  }
}
