import {Dispatch} from 'redux';
import {authApi} from '../api/todolists-api';
import {setIsLoggedInAC, SetIsLoggedInType} from '../features/TodolistsList/login-reducer';


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    initialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, initialized: action.value}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//thunks
export const InitializedTC = () => (dispatch: Dispatch<ActionsType>) => {
    authApi.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {

            }
            dispatch(setAppInitializedAC(true))
        })
    /*dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error)=>{
            handleServerNetWorkError(error,dispatch)
        })*/

}


export type SetErrorType = ReturnType<typeof setAppErrorAC>
export type SetStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>
type ActionsType = SetErrorType
    | SetStatusType
    | SetAppInitializedACType
    | SetIsLoggedInType
