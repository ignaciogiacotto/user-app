import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _idUserEventEmitter = new EventEmitter();

  private _findUserByIdEventEmitter = new EventEmitter();

  private _selectUserEventEmitter = new EventEmitter();

  private _errorsUserFormEventEmitter = new EventEmitter();

  private _pageUsersEventEmitter = new EventEmitter();
  

  constructor() { }

  get newUserEventEmitter(): EventEmitter<User>{
    return this._newUserEventEmitter;
  }
  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }

  public get findUserByIdEventEmitter() {
    return this._findUserByIdEventEmitter;
  }

  public get selectUserEventEmitter() {
    return this._selectUserEventEmitter;
  }

  public get errorsUserFormEventEmitter() {
    return this._errorsUserFormEventEmitter;
  }
  public set errorsUserFormEventEmitter(value) {
    this._errorsUserFormEventEmitter = value;
  }

  public get pageUsersEventEmitter() {
    return this._pageUsersEventEmitter;
  }
  public set pageUsersEventEmitter(value) {
    this._pageUsersEventEmitter = value;
  }
  

}
