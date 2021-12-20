import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-informacion-sucursales-mantenimiento',
  templateUrl: './informacion-sucursales-mantenimiento.component.html',
  styleUrls: ['./informacion-sucursales-mantenimiento.component.scss'],
})
export class InformacionSucursalesMantenimientoComponent implements OnInit {
  sucursales: Array<any> = [];
  nuevaSucursal: any= {};
  buscar: any = '';

  constructor(
    private rest: ResApiService,
    private notificacionesService: NotificationService
  ) {}

  ngOnInit(): void {
    this.obtenerSucursales();
  }

  async obtenerSucursales() {
    try {
      const data: any = await this.rest.get('api/sucursales');

      data['success']
        ? ((this.sucursales = data['sucursales']), this.notificacionesService.showSuccess('', 'Sucursales'))
        : this.notificacionesService.showWarning('', 'No existen sucursales');

    } catch (error) {
      this.notificacionesService.showError(error, 'Error al cargar sucursales');
    }
  }

  guardarSucursal(sucursal : any) {
     try {
       const data : any = this.rest.post('api/sucursales', sucursal);

       
      data['success']
      ? (this.notificacionesService.showSuccess(sucursal.titulo, 'Sucursal Guardad'))
      : this.notificacionesService.showWarning('', 'No existen sucursales');

     } catch (error) {
      this.notificacionesService.showError(error, 'Error al cargar sucursales');
     }  

     this.nuevaSucursal= {};
  }

  editarSucursal(sucursal: any) {
    this.nuevaSucursal = {...sucursal}
  }

  async borrarSucursal(id: any) {
    try {
      const data : any = await this.rest.delete(
        `api/sucursales/${id}`)

      data['success']
      ?(this.notificacionesService.showWarning('' ,"Se elimino"))
      :(this.notificacionesService.showError('','Error al eliminar'))
    } catch (error) {
      this.notificacionesService.showError(error, 'Error al borrar');
    }

    this.obtenerSucursales();
  }

}
