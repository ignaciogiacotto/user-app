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

}
