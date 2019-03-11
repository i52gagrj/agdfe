import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'login',
	templateUrl: '../views/login.html',
	providers: [UserService]
})
export class LoginComponent implements OnInit{
	public title: string;
	public user;
	public identity;
	public token;
	public falloadm;
	public fallopass;
	public falloemail;
	public sesionencurso;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.title = 'Identificate';
		this.user = {
			"email":"",
			"password":""
		};

	}

	ngOnInit(){
		console.log('El componente login.component ha sido cargado!!');
		this.logout();
		this.redirectIfIdentity();
	}

	logout() {
		this._route.params.forEach((params: Params) => {
			let logout = +params['id'];
			if(logout == 1) {
				this._userService.logout2().subscribe(            
					response => {                                     
						console.log("fin")
					},
					error => {
						console.log(<any>error)                
					}
				);
				this._userService.logout();
				this.identity = null;
				this.token = null;
				window.location.href = '/login';
			}
		}); 
	}

	redirectIfIdentity() {
		let identity = this._userService.getIdentity();
		if(identity != null && identity.sub) {
			this._router.navigate(["/"]);
		}		
	}


	onSubmit(){			
		this.falloadm = false;
		this.falloemail = false;
		this.fallopass = false;	
		this.sesionencurso = false;
		//SIGNUP
		this._userService.signup(this.user).subscribe(
			response => {
				this.token = response;
				if(this.token.length <= 1){
					console.log('Error en el servidor');
				}{
					if(!this.token.status){
						localStorage.setItem('token', JSON.stringify(this.token));
						
						//GET IDENTITY						
						this._userService.returnidentity(this.token).subscribe(
							response => {
								this.identity = response;
								if(this.identity.length <= 1){
									console.log('Error en el servidor');
								}{
									if(!this.identity.status){
										if(this.identity.isadmin){
											console.log('Esta es la entrada de clientes, no de administradores');
											this.falloadm = true;
											this._userService.logout2().subscribe(            
												response => {                                     
													console.log("fin")
												},
												error => {
													console.log(<any>error)                
												}
											);
											this._userService.logout();
											this.identity = null;
											this.token = null;
											window.location.href = '/login';
										}else{
											localStorage.setItem('identity', JSON.stringify(this.identity));										
											window.location.href = '/';
										}
									}									
								}
							},
							error => {
								console.log(<any>error);
							}	
						);						
					}else {
						console.log(this.token.message);	
						if(this.token.code == 402) this.falloemail = true;
						if(this.token.code == 403) this.fallopass = true;
						if(this.token.code == 404) this.sesionencurso = true;
					}
				}
			},
			error => {
				console.log(<any>error);
			}	
		);		
	}
}

