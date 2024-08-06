import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{

  user: User;
  errors: any = {};

  constructor(
    private sharingData: SharingDataService, 
    private route: ActivatedRoute, 
    private service: UserService){
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);

    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);//OP1) Con esta opcion espero la respuesta de datos de mi estado de Angular
    
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if(id > 0){
        this.sharingData.findUserByIdEventEmitter.emit(id);
        // this.service.findById(id).subscribe(user => this.user = this.user) //OP2) Con esta opcion voy a buscar el id al backend
      }
    });
  }

  onSubmit(userForm: NgForm): void{
    //if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    //}
    // userForm.reset();
    // userForm.resetForm();
  }

  onClear(userForm: NgForm): void{
    userForm.reset();
    userForm.resetForm();
  }
}
