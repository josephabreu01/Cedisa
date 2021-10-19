import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CarritoService } from './carrito.service';
import { DataService } from './data.service';
import { ResApiService } from './res-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Biblioteca';
  searchTerm = '';
  isCollapsed = true;
  estudios : any;
  pagina=1;
  cita: Array<object> = [];
  cantidad:any

 
  
  constructor(
    private router: Router , 
    public data: DataService,
    private rest: ResApiService,
    private activeRoute:ActivatedRoute,
    private carritoService:CarritoService 
    ){
    this.data.getProfile();
    this.cantidad = this.carritoService.obtenerEstudios().length
  }

  async ngOnInit(){
    
    this.activeRoute.params.subscribe(res =>{
      this.cita.push(res['estudio'])
      this.cantidad = this.carritoService.obtenerEstudios().length
      
    })
  
    try {
      const data : any = this.rest.get(
        `api/estudios/${this.pagina - 1}`
      )
        data['success']
        ?(this.estudios = data['estudios'])
        :this.data.error(data['error'])
        
    } catch (error) {
      this.data.error('No se pudieron cargar los estudios')
    }
  }

  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown() {
    close();
  }
  home(){
    this.searchTerm = '';
  }

  logout() {
  this.data.user = {};
  localStorage.clear();
  this.router.navigate(['']); 
  }

  search() {
    if (this.searchTerm) {
      this.collapse();
      this.router.navigate(['search', { query: this.searchTerm }]);
    }else{
      this.collapse();
      this.router.navigate(['']);
    }
  }
}

