import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.usuario= new UsuarioModel();
  }

  login(form:NgForm){

    if(form.invalid){return;}
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere Por Favor'    
    });
    console.log('Fromulario enviado');
    console.log(this.usuario);
    console.log(form);

    this.auth.login(this.usuario).subscribe(resp =>{

      console.log(resp);

    },(err)=>{
      console.log(err.error.error.message);
    })
  }

}
