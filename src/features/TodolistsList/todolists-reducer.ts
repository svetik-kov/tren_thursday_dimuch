import {v1} from 'uuid';
import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id?{...tl,title:action.title}:tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id?{...tl,filter:action.filter}:tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all'}))
        default:
            return state;
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId}) as const
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistThunk = (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.getTodolist()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}
export const fetchTodolistTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.getTodolist()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.deleteTodolist(id)
        .then((res) => {
            dispatch(removeTodolistAC(id))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

