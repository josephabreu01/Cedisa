import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../archivos/excel.service';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-extensiones-mantenimiento',
  templateUrl: './extensiones-mantenimiento.component.html',
  styleUrls: ['./extensiones-mantenimiento.component.scss'],
})
export class ExtensionesMantenimientoComponent implements OnInit {
  extensiones: any = [];
  nuevaExtension: any = {};
  buscar: any = '';
  excelCargado: Boolean = false;

  constructor(
    private rest: ResApiService,
    private notificaciones: NotificationService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.obtenerExtensiones();
  }

  async obtenerExtensiones() {
    try {
      const data: any = await this.rest.get('api/extensiones');

      data['success']
        ? ((this.extensiones = data['extensiones']),
          this.notificaciones.showSuccess('', 'Informaciones'))
        : this.notificaciones.showError(data['message'], 'Error');
    } catch (error) {
      this.notificaciones.showError(error, 'Error');
    }
  }

  async guardarExtension(extension: any) {
    try {
      const data: any = await this.rest.post('api/extensiones', extension);

      data['success']
        ? this.notificaciones.showSuccess('', 'Guardado')
        : this.notificaciones.showError(data['message'], 'Error');
    } catch (error) {
      this.notificaciones.showError(error, 'Error');
    }
    this.nuevaExtension = {};
    this.obtenerExtensiones();
  }

  editar(extension: any) {
    this.nuevaExtension = { ...extension };
  }

  async borrar(id: any) {
    try {
      const data: any = await this.rest.delete(`api/extensiones/${id}`);

      data['success']
        ? this.notificaciones.showWarning('', 'Borrado')
        : this.notificaciones.showError('', 'Error');
    } catch (error) {
      this.notificaciones.showError(error, 'Error');
    }

    this.obtenerExtensiones();
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
        ? (this.notificaciones.showSuccess('', 'Guardado'),
          this.excelService.limpiarCarga())
        : this.notificaciones.showError(data['message'], 'Error');

      setTimeout(() => {
        this.obtenerExtensiones();
        this.excelCargado = false;
      }, 2000);
    } catch (error) {
      this.notificaciones.showError(error, 'Error');
    }
  }
}
