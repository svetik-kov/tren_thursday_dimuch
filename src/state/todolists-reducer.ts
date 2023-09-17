import { v1 } from 'uuid';
import {todolistsApi, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
       todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
        todolists: TodolistType[]
}
export type TodolistDomainType=TodolistType & {
    filter:FilterValuesType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    |SetTodolistsActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist:TodolistDomainType={...action.todolist, filter:'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS':{
            return action.todolists.map(el=>({...el,filter:'all'}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistThank=(dispatch:Dispatch)=>{
    todolistsApi.getTodolist()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
        })
}

export const fetchTodolistTC=()=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.getTodolist()
            .then((res)=>{
                dispatch(setTodolistAC(res.data))
            })
    }
}
export const addTodolistTC=(title: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const removeTodolistTC=(id: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.deleteTodolist(id)
            .then((res)=>{
                dispatch(removeTodolistAC(id))
            })
    }
}

export const changeTodolistTitleTC=(id: string, title: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.updateTodolist(id,title)
            .then((res)=>{
                dispatch(changeTodolistTitleAC(id,title))
            })
    }
}

