import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TasksStateType} from '../../app/App';
import {
    authApi,
    LoginParamsType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsApi,
    UpdateTaskModelType
} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {setAppErrorAC, SetErrorType, setAppStatusAC, SetStatusType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetWorkError} from '../../utils/error-utils';
import {addTaskAC} from './tasks-reducer';


const initialState = {
    isLoggedIn: false

}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) =>
    ({
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const)


//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetWorkError(error, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetWorkError(error, dispatch)
        })
}


//types
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type ActionsType = SetIsLoggedInType
    | SetErrorType
    | SetStatusType

