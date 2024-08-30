import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authService: AuthService){}

  @Input() users: User[] = [];
  
  @Input() paginator = {};

  get login(){
    return this.authService.user;
  }

  get admin(){
    return this.authService.isAdministrator();
  }
}
