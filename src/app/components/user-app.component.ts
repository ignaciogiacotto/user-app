import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  user!: User;

  constructor( 
    private sharingData: SharingDataService,
    private router: Router,
    private authService: AuthService){ 
    }

  ngOnInit(): void {

    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password }) =>{
      console.log(username+ ' ' + password)
      this.authService.loginUser({ username, password }).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);

          this.authService.token = token;
          this.authService.user = {
            user: {username: payload.sub},
            isAuth: true,
            isAdmin: payload.isAdmin
          }
          this.router.navigate(['/users']);
        },
        error: error => {
          if(error.status == 401){
            Swal.fire('Error en el login', error.error.message, 'error')
          }else{
            throw error;
          }
        }
        
      })
    })
  }


}
