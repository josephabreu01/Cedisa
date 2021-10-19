import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../anuncio';
import { AnuncioService } from '../anuncio.service';
import { DataService } from '../data.service';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-mantenimiento-avisos',
  templateUrl: './mantenimiento-avisos.component.html',
  styleUrls: ['./mantenimiento-avisos.component.scss']
})
export class MantenimientoAvisosComponent implements OnInit {

  anuncios: any;
  nuevoAnuncio: any = {
    titulo: '',
    descripcion: '',
    habilitado: true
  }

  constructor(
    private data: DataService,
    private rest: ResApiService,
    private anuncioService: AnuncioService,
    private notificacion: NotificationService
  ) { }

  ngOnInit() {

    this.obtenerAnuncios()

  }

  async agregar(nuevoAnuncio: any) {
    try {
      if (nuevoAnuncio.titulo && nuevoAnuncio.descripcion) {
        const data: any = await this.rest.post(
          'api/anuncio',
          nuevoAnuncio);


        data['success']
          ? (this.notificacion.showSuccess(nuevoAnuncio.titulo, 'Se agrero el anuncio'), this.anuncioService.limpiar())
          : this.data.error(data['message'])

        this.nuevoAnuncio = {}
        this.obtenerAnuncios();
      } else {
        this.data.error('Tiene campos vacios')
      }
    } catch (error) {
      this.data.error('Tiene campos vacios')
    }

  }

  async obtenerAnuncios() {
    try {
      const data: any = await this.rest.get(
        'api/anuncio'
      )
      data['success']
        ? this.anuncios = data['anuncios']
        : this.data.error('No se encontraron los anuncios')
    } catch (error) {
      this.data.error(('No se encontraron los anuncios'))
    }
  }

  habilitarAnuncio(anuncio: Anuncio) {
    confirm('Desea modificar el estatus de este aviso ?')
    ?(Promise.resolve(this.anuncioService.agregar(anuncio))
    .then(result => {
      this.notificacion.showInfo('Cambio de estatus',anuncio.titulo)
      this.nuevoAnuncio = {}
      let agregar = this.anuncioService.obtener()
      this.agregar(agregar[0]);
    }))
    :this.notificacion.showWarning('No se modifico',anuncio.titulo)
      
    this.obtenerAnuncios();
    
  }

  editar(anuncio: Anuncio) {
    
    this.nuevoAnuncio = Object.assign({}, anuncio);
  }

  async borrar(id: any) {
    if (confirm('Desea eliminar este aununcio ?')) {
      try {
        const data: any = await this.rest.delete(
          `api/anuncio/${id}`
        );

        data['success']
          ? this.data.success = data['message']
          : this.data.error('No se encontraron los anuncios')

        this.obtenerAnuncios();
      } catch (error) {
        this.data.error(error)
      }
    }

  }

}
