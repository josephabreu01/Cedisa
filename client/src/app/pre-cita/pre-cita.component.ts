import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-pre-cita',
  templateUrl: './pre-cita.component.html',
  styleUrls: ['./pre-cita.component.scss']
})
export class PreCitaComponent implements OnInit {
  filterTerm :string = '';
  estudios : any;
  constructor(
    private carrito : CarritoService,
    private router: Router,
    private notificacion:NotificationService
  ) { }

  ngOnInit(): void {
  this.estudios =  this.carrito.obtenerEstudios();
  }

  borrarEstudio(item : any, arreglo :any){
    this.carrito.borrarEstudio(item,arreglo)
    this.notificacion.showError(item.nombre,'Se elimino')
  }

  cancelarCita(){
    if(confirm('Se eliminara la cita')){
      this.carrito.borrarEstudios();
      this.router.navigate(['']);
      this.notificacion.showError('Se cancelo la Cita','')
    }
    
  }

}
