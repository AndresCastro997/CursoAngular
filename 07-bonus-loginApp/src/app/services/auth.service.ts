import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/Usuario.model';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='https://identitytoolkit.googleapis.com/v1/accounts:sign';
  apikey=  'AIzaSyAAi3uFkizBxFuajxHq-vdhL1n6GbpQZhI' ;
  usertoken:string;     
  
  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyBNHNL-r9q2VQkXa3-bpw7Wt_9jGhS_I1c]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]



  constructor(private http:HttpClient) { 
    this.leerToken();
  }


  logout(){}
  login(usuario:UsuarioModel){
    const authData={
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAi3uFkizBxFuajxHq-vdhL1n6GbpQZhI',
      authData
    ).pipe(map(resp=>{
      console.log('entro en el mapa del rxjs');
      this.guardarToken(resp['idToken']);
      return resp;
    }));

  }
  nuevoUsuario(usuario:UsuarioModel){
    const authData={
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAi3uFkizBxFuajxHq-vdhL1n6GbpQZhI',
      authData
    ).pipe(map(resp=>{
      console.log('entro en el mapa del rxjs');
      this.guardarToken(resp['idToken']);
      return resp;
    }));
  }

  private guardarToken(idToken:string){

    this.usertoken=idToken;
    localStorage.setItem('token',idToken);

  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.usertoken=localStorage.getItem('token');
    }else{
      this.usertoken='';
    }

    return this.usertoken;


  }
}
