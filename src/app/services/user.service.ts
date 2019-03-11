import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class UserService{
	public url: string;
	public identity;
	public token;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	signup(user_to_login) {
		let json = JSON.stringify(user_to_login);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/login', params, {headers: headers}).map(res => res.json());
	}

	returnidentity(token) {
		let json = JSON.stringify(token);
		let params = "token="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/returnidentity', params, {headers: headers}).map(res => res.json());
	}

	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return identity;
	}

	getToken() {
		let token = JSON.parse(localStorage.getItem('token'));		

		if(token != "undefined"){
			this.token = token;
		} else {
			this.token = null;
		}

		return token;
	}

	setToken(nuevotoken) {
		localStorage.setItem('token', JSON.stringify(nuevotoken));
		this.token = JSON.parse(localStorage.getItem('token'));

		return this.token;
	}

	logout(){
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.removeItem('cliente');
	}

	logout2() {
		let token = JSON.parse(localStorage.getItem('token'));

		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		
		return this._http.post(this.url+'/logout', params, {headers: headers}).map(res => res.json());
	}

	returnInfoClient(token) {		
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/returninfoclient', params, {headers: headers}).map(res => res.json());
	}	

}	