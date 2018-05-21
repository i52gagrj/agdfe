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
	
    create(token, modelo, file) {
		let json = JSON.stringify(modelo);
		let params = "json="+json+"&authorization="+token+"&file="+file;
		//let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		//return this._http.post(this.url+'/documento/new', params, {headers: headers}).map(res => res.json());
		return this._http.post(this.url+'/modelo/new', params).map(res => res.json());
	}	
	
	getModelos(token, page = null){
		let params = "authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		if(page == null) {
			page=1;
		}

		return this._http.post(this.url+'/modelo/listall?page='+page , params, {headers: headers}).map(res => res.json());
	}	
	
    getModelo(token, id){
		let params = "authorization="+token+"&id="+id;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});		
		
		return this._http.post(this.url+'/modelo/returnone', params, {responseType: ResponseContentType.Blob, headers: headers}).map(res => res.json());
	}	
}	