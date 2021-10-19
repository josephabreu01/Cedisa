import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EstudioComponent } from './estudio/estudio.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MantenimientoAvisosComponent } from './mantenimiento-avisos/mantenimiento-avisos.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { PostProductComponent } from './post-product/post-product.component';
import { PreCitaComponent } from './pre-cita/pre-cita.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';



const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path:'categorias/:id',
    component: CategoriaComponent
    
  },
  {
    path:'estudio/:id',
    component:EstudioComponent
  },
  {
    path:'profile/register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile/postproduct',
    component: PostProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/myproducts', 
    component: MyProductsComponent,
    canActivate: [AuthGuardService]
  }, 
  {
    path:'preCita',
    component:PreCitaComponent
  },
  {
    path:'mantenimientoAvisos',
    component:MantenimientoAvisosComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
