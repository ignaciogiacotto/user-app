import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { findAll, findAllPageable, load, setPaginator } from "./users.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class UsersEffects {

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(action => this.service.findAllPageable(action.page)
            .pipe(
                map(pageable => {
                    const users = pageable.content as User[];
                    const paginator = pageable;
                    
                    return findAllPageable({ users, paginator })
                }),
                catchError( () => EMPTY)
            )
            )
        )
    );

    constructor (private actions$: Actions, 
        private service: UserService
    ){}

}