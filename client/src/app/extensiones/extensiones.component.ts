import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styleUrls: ['./extensiones.component.scss']
})
export class ExtensionesComponent implements OnInit {
  busqueda: any = '';
  extesnsiones : any = []
  nuevaExtension: any = {}

  constructor(
    private rest : ResApiService,
    private notificaciones : NotificationService
  ) { }

  ngOnInit(): void {
    this.obtenerExtensiones();
  }

 async obtenerExtensiones(){
    try {
      const data : any = await this.rest.get(
        'api/extensiones'
      )
      
      data['success']
      ?(this.extesnsiones = data['extensiones'],this.notificaciones.showSuccess('','Informaciones'))
      :(this.notificaciones.showError(data['message'],'Error'))

    } catch (error) {
      this.notificaciones.showError(error,'Error')
    }
  }

  // guardarExtension(extension: any ){
  //   try {
  //     const data : any = this.rest.post(
  //       'api/extensiones',
  //         extension
  //       )

  //       data['success']
  //       ?(this.notificaciones.showSuccess('','Guardado'))
  //       :(this.notificaciones.showError(data['message'],'Error'))
    
      
  //   } catch (error) {
  //     this.notificaciones.showError(error,'Error')
  //   }
  // }

}
