import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TasksStateType} from '../../app/App';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {setAppErrorAC, SetErrorType, setAppStatusAC, SetStatusType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetWorkError} from '../../utils/error-utils';
import axios, {AxiosError} from 'axios';


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case 'ADD-TASK':
            /*  const stateCopy = {...state}
              const newTask: TaskType = action.task
              const tasks = stateCopy[newTask.todoListId];
              const newTasks = [newTask, ...tasks];
              stateCopy[newTask.todoListId] = newTasks;
              return stateCopy;*/
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'CHANGE-TASK-TITLE':
            // let todolistTasks = state[action.todolistId];
            // // найдём нужную таску:
            // let newTaskArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            //
            // state[action.todolistId] = newTaskArray;
            // return ({...state});
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS':
            /* return action.todolists.reduce((acc, tl) => {
                 acc[tl.id] = []
                 return acc
             }, {...state})*/
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}

        default:
            return state;
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({
        type: 'REMOVE-TASK',
        taskId: taskId,
        todolistId: todolistId
    } as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({
        type: 'UPDATE-TASK',
        model,
        todolistId,
        taskId
    } as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistId,
        taskId
    } as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string,) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTask(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
//promise
/*export const removeTasksTC = (taskId: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                const action = removeTaskAC(taskId, todolistId);
                dispatch(action);
            })
    }*/
//async await типизация error
export const removeTasksTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsApi.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const errorMessage = e.response ? e.response.data.error : e.message
            handleServerNetWorkError(errorMessage, dispatch)
        } else {
            handleServerNetWorkError((e as Error).message, dispatch)
        }
    }
    todolistsApi.deleteTask(todolistId, taskId)
        .then((res) => {
            const action = removeTaskAC(taskId, todolistId);
            dispatch(action);
        })
}

// export const addTasksTC = (title: string, todolistId: string) =>
//     (dispatch: Dispatch<ActionsType>) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsApi.createTask(todolistId, title)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     const action = addTaskAC(res.data.data.item);
//                     dispatch(action);
//                     dispatch(setAppStatusAC('succeeded'))
//                 } else {
//                     handleServerAppError(res.data,dispatch)
//                 }
//             })
//             .catch((error)=>{
//                 handleServerNetWorkError(error,dispatch)
//             })
//     }

//типизация error
export const addTasksTC = (title: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = addTaskAC(res.data.data.item);
                    dispatch(action);
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                const errorMessage = error.response ? error.response.data.error : error.message
                handleServerNetWorkError(errorMessage, dispatch)
            })
    }
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return;
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todolistId);
                    dispatch(action);
                } else {
                    handleServerAppError(res.data, dispatch)
                    /*   if (res.data.messages.length) {
                           dispatch(setAppErrorAC(res.data.messages[0]))
                       } else {
                           dispatch(setAppErrorAC('Some error occurred'))
                       }
                       dispatch(setAppStatusAC('failed'))*/
                }

            })
            .catch((error) => {
                handleServerNetWorkError(error, dispatch)
                /*dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))*/
            })
    }

//types
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetErrorType
    | SetStatusType
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ErrorType = {
    statusCode: number,
    messages: [{ message: string, field: string }]
    error: string
}