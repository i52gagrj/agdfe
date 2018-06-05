import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../services/global';

@Injectable()
export class ModeloService{
	public url: string;
	//public identity;
	//public token;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}
	
	getModelos(token){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/modelo/listall', params, {headers: headers}).map(res => res.json());
	}	
	
    getModelo(token, id){
		let params = "authorization="+token+"&id="+id;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});		
		
		return this._http.post(this.url+'/modelo/returnone', params, {responseType: ResponseContentType.Blob, headers: headers}).map(res => res.json());
	}	
}	