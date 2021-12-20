import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EstudioComponent } from './estudio/estudio.component';
import { EstudiosVistaComponent } from './estudios-vista/estudios-vista.component';
import { ExtensionesMantenimientoComponent } from './extensiones-mantenimiento/extensiones-mantenimiento.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { HomeComponent } from './home/home.component';
import { InformacionSucursalesMantenimientoComponent } from './informacion-sucursales-mantenimiento/informacion-sucursales-mantenimiento.component';
import { InformacionSucursalesComponent } from './informacion-sucursales/informacion-sucursales.component';
import { LoginComponent } from './login/login.component';
import { MantenimientoAvisosComponent } from './mantenimiento-avisos/mantenimiento-avisos.component';
import { MantenimientopreguntasComponent } from './mantenimientopreguntas/mantenimientopreguntas.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { PostProductComponent } from './post-product/post-product.component';
import { PreCitaComponent } from './pre-cita/pre-cita.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
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
    path:'extensiones',
    component:ExtensionesComponent
  },
  {
    path:'sucursales',
    component:InformacionSucursalesComponent
  },
  {
    path:'preguntas',
    component:PreguntasComponent
  },
  {
    path:'estudiosVista',
    component:EstudiosVistaComponent
  },
  {
    path:'mantenimientoAvisos',
    component:MantenimientoAvisosComponent
  },
  {
    path:'mantenimientoPreguntas',
    component:MantenimientopreguntasComponent
  },
  {
    path:'mantenimientoExtensiones',
    component:ExtensionesMantenimientoComponent
  },
  {
    path:'mantenimientoSucursales',
    component:InformacionSucursalesMantenimientoComponent,
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
