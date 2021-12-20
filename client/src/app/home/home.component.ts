import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  rutas: Array<any> = [
    {
      nombre: 'Pantalla de Estudios',
      ruta: 'estudiosVista',
      texto: 'Estudios',
      icono: 'bi bi-file-text-fill',
      color:'#6fd1c6'
    },
    {
      nombre: 'Pantalla de Preguntas',
      ruta: 'preguntas',
      texto: 'Preguntas a Seguir en una llamada',
      icono: 'bi bi-question-square-fill',
      color: '#d1d16f'
    },
    {
      nombre: 'Extensiones',
      ruta: 'extensiones',
      texto: 'Extensiones de Cedisa',
      icono:'bi bi-telephone-forward-fill',
      color:'#6fadd1'
    },
    {
      nombre: 'Informacion Sucursales',
      ruta: 'sucursales',
      texto: 'Infromacion general de las Sucursales',
      icono:'bi bi-bank2',
      color:'#d16f6f'
    },
  ];

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
  }

  async ngOnInit() {
    await this.obtenerAnuncios();

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

  cambiarTab() {
    if (this.active === this.tabs) {
      return (this.active = this.tabs);
    } else {
      return this.active + 1;
    }
  }

  cambioHome() {
    this.soloInformacion = !this.soloInformacion;
    this.homeService.guardarVista(this.soloInformacion);
  }

  extensiones() {}
}
