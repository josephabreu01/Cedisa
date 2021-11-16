import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CarritoService } from '../carrito.service';
import { DataService } from '../data.service';
import { Estudio } from '../estudio';
import { NotificationService } from '../notification.service';
import { ResApiService } from '../res-api.service';


@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.scss']
})
export class EstudioComponent implements OnInit {
  estudio: any;
  ars: any;
  medico: any;
  editarPreparacion = false;
  showToast = false;
  cantidad: any;
  estudioSelecionado: Estudio = {
    nombre: '',
    precio: 0,
    categoria: '',
    horarios: [],
    aseguradora: []
  }

  constructor(
    public data: DataService,
    private rest: ResApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carritoService: CarritoService,
    public notificacion: NotificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest.get(`api/estudio/${res['id']}`)
        .then(data => {
          let datos: any = data;
          console.log(datos)
          datos['success']
            ? (this.estudio = datos.estudio[0], this.ars = datos.ars, this.medico = datos.medico)
            : this.router.navigate(['/'])
          this.duracion();
          window.scroll(0, 0);



        }).catch(error => this.data.error(error['message']))
    })
    this.cantidad = this.carritoService.obtenerEstudios().length
  }

  citaEstudio(estudio: object) {

    this.showToast = true;
  }

  agregarCita(estudio: any, aseguradoras: any, horarios: any) {

    this.estudioSelecionado.nombre = estudio.product_name.toString();
    this.estudioSelecionado.aseguradora = aseguradoras;
    this.estudioSelecionado.horarios = horarios;
    this.estudioSelecionado.precio = estudio.price1;

    this.carritoService.agregarEstudios(this.estudioSelecionado);
    this.notificacion.showWarning(this.estudioSelecionado.nombre, "Se agrego")
    this.cantidad = this.carritoService.obtenerEstudios().length
  }
  confirmarCita() {
    this.router.navigate(['preCita'])
  }

  duracion() {
    if (this.estudio.duracion2 === "0") {
      this.estudio.duracion2 = 'No esta Configurado'
    }
  }

  volverInicio(){
    this.router.navigate(['']);
  }

}
