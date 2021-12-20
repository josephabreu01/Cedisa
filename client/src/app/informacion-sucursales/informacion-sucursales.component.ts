import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-informacion-sucursales',
  templateUrl: './informacion-sucursales.component.html',
  styleUrls: ['./informacion-sucursales.component.scss']
})
export class InformacionSucursalesComponent implements OnInit {

  sucursales : any = [];
  busqueda:any ='';
  constructor(
   private notificacionesService : NotificationService,
   private rest : ResApiService
  ) { }

  ngOnInit(): void {
    this.obtenerSucursales()
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
}
