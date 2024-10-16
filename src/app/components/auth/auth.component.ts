import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user : User;

  constructor(private store: Store<{auth: any}>
  ){
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
      this.store.dispatch(login({username: this.user.username, password: this.user.password}))
    }
  }
}
