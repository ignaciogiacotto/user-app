import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Ignacio',
    lastname: 'Giacotto',
    email: 'ignacio@email.com',
    username: 'ignacio',
    password: '1234'
  },
  {
    id: 2,
    name: 'Victoria',
    lastname: 'Nuñez',
    email: 'victoria@email.com',
    username: 'victoria',
    password: '1234'
  }];

  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);

  }
}
