import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { add, addSuccess, findAll, findAllPageable, load, setErrors, setPaginator } from "./users.actions";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { User } from "../models/user";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

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

    addUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(add),
            exhaustMap(action => this.service.create(action.userNew)
                .pipe(
                    map( userNew => addSuccess({ userNew }) ),
                    catchError( error => (error.status == 400) ? of(setErrors({ errors: error.error})) : EMPTY
                    )
                )
            )
        )
    );

    addSuccesUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(addSuccess),
            tap(() => {
                this.router.navigate(['/users']);
                Swal.fire({
                title: "Actualizado",
                text: "Usuario editado con exito",
                icon: "success"
                });
            })
        ), {dispatch: false}
    )

    constructor (
        private actions$: Actions, 
        private service: UserService,
        private router: Router
    ){}

}