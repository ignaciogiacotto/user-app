import { createReducer, on } from "@ngrx/store"
import { login, logout } from "./auth.actions"
import { state } from "@angular/animations"

export const initialLogin = {
    isAuth: false,
    isAdmin: false,
    user: undefined
}

export const authReducer = createReducer(
    initialLogin,
    on(login, (state, {login}) => (
        {
            isAuth: true,
            isAdmin: login.isAdmin,
            user: login.user
        }
    )),
    on(logout, (state) => ({ ...initialLogin }))
)