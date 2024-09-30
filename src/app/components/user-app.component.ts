import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { add, find, findAll, remove, setPaginator, update } from '../store/users.actions';

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
    private store: Store<{users: any}>,
    private service: UserService, 
    private sharingData: SharingDataService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute){ 
      this.store.select('users').subscribe(state =>{
        this.user = {... state.user};
      })
    }

  ngOnInit(): void {

    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  handlerLogin(){
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password }) =>{
      console.log(username+ ' ' + password)
      this.authService.loginUser({ username, password }).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);
          const user = { username: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
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
  pageUsersEvent(){
    this.sharingData.pageUsersEventEmitter.subscribe( pageable =>{
      // this.users = pageable.users;
      // this.paginator = pageable.paginator;
      this.store.dispatch(findAll({ users: pageable.users}))
      this.store.dispatch(setPaginator({ paginator: pageable.paginator}))
    });
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      // const user = this.users.find(user => user.id == id);
      this.store.dispatch(find({ id }))
      this.sharingData.selectUserEventEmitter.emit(this.user);
    })
  }

  addUser(){
    this.sharingData.newUserEventEmitter.subscribe( user =>{
      if(user.id > 0){
        this.service.update(user).subscribe( 
          {next: userUpdated => {
          this.store.dispatch(update({ userUpdated }))
          this.router.navigate(['/users']);
          
          Swal.fire({
            title: "Actualizado",
            text: "Usuario editado con exito",
            icon: "success"
          });
          },
          error: (err) => {
            if(err.status == 400){
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
    })

      }else{
        this.service.create(user).subscribe(
          {next: userNew => {
          this.store.dispatch(add({ userNew }))
          this.router.navigate(['/users']);
          
          Swal.fire({
            title: "Nuevo usuario Creado",
            text: "Usuario creado con exito",
            icon: "success"
          });
          },
          error: (err) => {
            if(err.status == 400){
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
        })
      }
    })
  }

  removeUser(): void{
    this.sharingData.idUserEventEmitter.subscribe( id => {
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

          this.service.remove(id).subscribe(()=> {
            this.store.dispatch(remove({ id }))
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then( () => {
              this.router.navigate(['/users']);
            });
          })

          Swal.fire({
            title: "Eliminado",
            text: "Usuario eliminado con éxito.",
            icon: "success"
          });
        }
      });
    });
  }
}
