import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user : User;

  constructor(){
    this.user = new User;
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire({
        title: 'Error de validación',
        text: 'Username y password requeridos',
        icon: 'error'
      });
    } else{
      console.log(this.user);
    }
  }
}
