import {setAppErrorAC, setAppStatusAC, SetErrorType, SetStatusType} from '../app/app-reducer';
import {useAppDispatch} from '../app/store';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';


export const handleServerAppError=<T>(data:ResponseType<T>,dispatch:Dispatch<SetErrorType | SetStatusType>)=>{

    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetWorkError=(error:{message:string},dispatch:Dispatch<SetErrorType | SetStatusType>)=>{

    dispatch(setAppErrorAC(error.message? error.message:'Some error occurred '))
    dispatch(setAppStatusAC('failed'))
}