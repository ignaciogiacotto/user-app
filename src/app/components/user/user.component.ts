import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  
  title: string = 'Lista de usuarios'

  users: User[] = [];

  paginator: any = {};

  pageUrl : string = '/users/page'

  constructor(
    private store: Store<{ users: any}>,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {

      this.store.select('users').subscribe(state => {
        this.users = state.users;
        this.paginator = state.paginator;
      });

    }


  ngOnInit(): void {
      this.route.paramMap.subscribe(params => this.store.dispatch(load({ page: +(params.get('page') || '0') }))) //Paginacion
  }

  onRemoveUser(id: number): void{ 
    Swal.fire({
      title: "Estas seguro de eliminar el usuario?",
      text: "No podrás deshacer este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
          this.store.dispatch(remove({ id }));
        }
    });
  }

  onSelectedUser(user: User): void{
    this.router.navigate(['/users/edit', user.id])
  }

  get admin(){
    return this.authService.isAdministrator();
  }

  get token(){
    return this.authService.isAuthenticated();
  }
}
