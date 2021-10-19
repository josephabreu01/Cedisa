import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estudios : any;
  busqueda :string = '';
  isCollapsed = -1 ;
  pagina = 1;
  totalEstudios : number = 0;
  anuncios : Array<any>  = [];
  tienenAnuncios :Boolean = true
  
  

  constructor(
    private data: DataService, 
    private rest:ResApiService,
    private carousel : NgbCarouselConfig
    
    )  { 
      this.carousel.showNavigationIndicators = false;
    }

   async ngOnInit() {
    await this.obtenerEstudios();
    await this.obtenerAnuncios();
    

    }
  
    get lower() {
      return 10 * (this.pagina - 1) + 1;
    }
  
    get upper() {
      return Math.min(12 * this.pagina, this.totalEstudios);
    }

  async obtenerEstudios(event?: any){

    if (event) {
      this.estudios = null;
      
    }

    
    try {
      const data : any = await this.rest.get(
        `api/estudios/${this.pagina - 1}`
      )
      data['success']
      ?(this.estudios = data['estudios'],this.totalEstudios = data['totalEstudios'])
      :this.data.error('No se pudieron encontrar los Estudios'); 

      window.scroll(0,0);
    } catch (error) {
      this.data.error(error['message'])
      
    }
  }

  collapse() {
    
  }

  async obtenerAnuncios(){
    try {
      const data: any = await this.rest.get(
        'api/anuncio'
      )
      data['success']
        ? this.anuncios = data['anuncios']
        : this.data.error('No se encontraron los anuncios');

       this.anuncios = this.anuncios.filter(anuncio => anuncio.habilitado === true);
       this.tienenAnuncios = this.anuncios.length ? true : false; 
    } catch (error) {
      this.data.error('No se encontraron los anuncios')
    }
  }

  closeDropdown() {
    !this.isCollapsed
  }

  
}
