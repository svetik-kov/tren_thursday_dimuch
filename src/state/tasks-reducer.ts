import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            /*const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;*/
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
           /* let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});*/
            return {...state,[action.todolistId]
                    :state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTaskArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTaskArray;
            return ({...state});
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
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        case 'SET-TASKS': {
            /*const copyState={...state}
            copyState[action.todolistId]=action.tasks
            return copyState*/
            return {...state, [action.todolistId]: state[action.todolistId] = action.tasks}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
/*export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}*/
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
/*export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}*/
export const setTasksAC = (tasks: TaskType[], todolistId: string,): SetTasksActionType => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    }
}


export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTask(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTasksTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                const action = removeTaskAC(taskId, todolistId);
                dispatch(action);
            })
    }
}

export const addTasksTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                const action = addTaskAC(res.data.data.item);
                dispatch(action);
            })
    }
}
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                const action = updateTaskAC( taskId, domainModel, todolistId);
                dispatch(action);
            })
    }
}
