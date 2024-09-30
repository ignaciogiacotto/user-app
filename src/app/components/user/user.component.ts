import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';
import { load } from '../../store/users.actions';

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
    private service: UserService,
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private authService: AuthService) {

      this.store.select('users').subscribe(state => {
        this.users = state.users;
        this.paginator = state.paginator;
      });

    }


  ngOnInit(): void {
    if(this.users == undefined || this.users == null || this.users.length == 0){
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.store.dispatch(load({ page }));
      }) //Paginacion
    }
  }

  onRemoveUser(id: number): void{
  this.sharingData.idUserEventEmitter.emit(id);
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
