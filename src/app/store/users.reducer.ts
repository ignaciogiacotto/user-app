import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { addSuccess, find, findAll, findAllPageable, load, remove, resetUser, setErrors, setPaginator, update, updateSuccess } from "./users.actions";
import { state } from "@angular/animations";

const users: User[] = [];
const user: User = new User();
export const usersReducer = createReducer(
    {
        users,
        paginator: {},
        user,
        errors: {}
    },
    on(resetUser, (state) => (
        {
        users: state.users,
        paginator: state.paginator,
        user: {... user},
        errors: state.errors
        }
    )),
    on(findAll, (state, { users }) => (
        { 
            users: [...users],
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    )),
    on(findAllPageable, (state, { users, paginator }) => (
        { 
            users: [...users],
            paginator: {... paginator},
            user: state.user,
            errors: state.errors
        }
    )),
    on(find, (state, { id }) => (
        {
            users: state.users,
            paginator: state.paginator,
            user: state.users.find(user => user.id == id) || new User(),
            errors: state.errors
        }
    )),
    on(setPaginator, (state, { paginator }) => (
        {
            users: state.users,
            paginator: { ...paginator },
            user: state.user,
            errors: state.errors
        }
    )),
    on(addSuccess, (state, { userNew }) => (
        {
            users:  [...state.users, { ...userNew }],
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    )),
    on(updateSuccess, (state, { userUpdated }) => (
        {
            users: state.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u),
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    )),
    on(remove, (state, { id }) => (
        {
            users: state.users.filter(user => user.id != id),
            paginator: state.paginator,
            user: state.user,
            errors: state.errors
        }
    )),
    on(setErrors, (state, { errors }) =>(
        {
            users: state.users,
            paginator: state.paginator,
            user: state.user,
            errors: {... errors}
        }
    ))
)