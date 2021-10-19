import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ResApiService } from '../res-api.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  estudio  = {
    titulo:'',
    precio:0,
    categoriaId:'',
    descripcion:''
  }
  
  categoriaId ='';
  categorias:any;
  btnDisabled : boolean = false;


  constructor(
    public data: DataService,
    private rest : ResApiService,
    private router: Router 
  ) { }

  async ngOnInit() {
    try {
      const data: any = await this.rest.get(
        'api/categorias'
      );

      data['success']
        ? (this.categorias = data['categorias'])
        : this.data.error(data['message']);

    } catch (error) {
      this.data.error(error['message'])
    }
  }

  validate(product : any) {
    if (product.titulo) {
      if (product.precio) {
        if (product.categoriaId) {
          if (product.descripcion) {
              return true;
          } else {
           return this.data.error('Please enter descripcion.');
          }
        } else {
         return this.data.error('Please select categoria.');
        }
      } else {
       return this.data.error('Please enter a precio.');
      }
    } else {
     return this.data.error('Please enter a titulo.');
    }
  }

  async post() {
    this.estudio  
    this.btnDisabled = true;
    try {
      if (this.validate(this.estudio)) {
       
        const data : any = await this.rest.post(
          'http://localhost:3030/api/administrador/estudios',
          this.estudio
        );
        data['success']
          ? this.router.navigate(['/profile/postproduct'])
            .then(() => this.data.success(data['message']) )
            .catch(error => this.data.error(error))
          : this.data.error(data['message']);

           this.estudio  = {
            titulo:'',
            precio:0,
            categoriaId:'',
            descripcion:''
          }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  misEstudios(){
    this.router.navigate(["/profile/myproducts"])
    .then((result) => result)
    .catch((error) => error)
  }

}
