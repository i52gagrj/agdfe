import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { DefaultComponent } from './components/default.component';
import { DocumentoComponent } from './components/documento.component';
//import { DocumentoNewComponent } from './components/documento.new.component';
import { ModeloComponent } from './components/modelo.component';
import { MensajeComponent } from './components/mensaje.component';
import { MensajeNewComponent } from './components/mensaje.new.component';
 
const appRoutes: Routes = [
	{path:'', component: DefaultComponent},
	{path:'login', component: LoginComponent},
	{path:'login/:id', component: LoginComponent},
	{path:'documento', component: DocumentoComponent},
	//{path:'documento-new', component: DocumentoNewComponent},	
	{path:'modelo', component: ModeloComponent},	
	{path:'mensaje', component: MensajeComponent},
	{path:'mensaje-new', component: MensajeNewComponent},	
	{path:'**', component: LoginComponent} 
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
