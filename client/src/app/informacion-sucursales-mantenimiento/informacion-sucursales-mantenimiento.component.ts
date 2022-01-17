import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../archivos/excel.service';

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
  excelCargado: Boolean = false;

  constructor(
    private rest: ResApiService,
    private notificacionesService: NotificationService,
    private excelService: ExcelService
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

  cargarExcel(archivo: any) {
    this.excelService.readfile(archivo);

    if (archivo) {
      this.excelCargado = true;
    }
  }

  async guardarExcel() {
    let excel = this.excelService.getFile();
    try {
      const data: any = await this.rest.post('api/extensiones/excel', excel[0]);

      data['success']
        ? (this.notificacionesService.showSuccess('', 'Guardado'),
          this.excelService.limpiarCarga())
        : this.notificacionesService.showError(data['message'], 'Error');

      setTimeout(() => {
        this.obtenerSucursales();
        this.excelCargado = false;
      }, 2000);
    } catch (error) {
      this.notificacionesService.showError(error, 'Error');
    }
  }

}
