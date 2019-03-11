import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'default',
	templateUrl: '../views/default.html'
})
export class DefaultComponent implements OnInit{
	public title: string;
	public documentos_cliente;
	public modelos_cliente;
	public mensajes_cliente;
	public token;
	public info;	
	public identity;		

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'AGD - Clientes';
	}

	ngOnInit(){
		console.log('El componente Default ha sido cargado!!');
		this.redirectIfNoIdentity();
		this.mostrarDatos();
	}

	redirectIfNoIdentity() {
		let identity = this._userService.getIdentity();
		if(identity == null) {
			this._router.navigate(["/login"]);
		}		
	}	

	mostrarDatos(){
		//Llamar al backend, y pedir el número de documentos, modelos y mensajes del cliente		     
		this.token = this._userService.getToken();   
		console.log(this.token);
        this._userService.returnInfoClient(this.token).subscribe(
            response => {
                if(response.code == 405){
                    console.log("Token caducado. Reiniciar sesión")
                    this._userService.logout();
                    this.identity = null;
					this.token = null;
					console.log("Estoy aquí")
                    window.location.href = '/login';                        
				}

                if(response.code == 200){                     
                    this.info = response.data;
					this.token = this._userService.setToken(response.token);                    
					this.documentos_cliente = response.documents[1];
					this.modelos_cliente = response.models[1];
					this.mensajes_cliente = response.messages[1];
					console.log(this.documentos_cliente);
					console.log(this.modelos_cliente);
					console.log(this.mensajes_cliente);
                }
            },
            error => {
                console.log(<any>error);
            }
        );	
	}
}