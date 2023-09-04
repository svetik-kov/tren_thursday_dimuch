import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '31250932-6c2f-4b49-9f3f-4f94da6b2415'
    }
}
const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export type TodolistType={
    id: string
    title: string
    addedDate: string
    order: number
}
type CreatTodolistResponseType={
    resultCode: number
    messages: string[],
    data: { item:   TodolistType }
}
type DeleteTodolistResponseType={
    resultCode:number
    messages: string[],
    data: {}
}
type UpdateTodolistResponseType={
    resultCode:number
    messages: string[],
    data: {}
}
type ResponseType<T={}>={
    resultCode:number
    messages: string[],
    data: T
}
export enum TaskStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3
}
export enum TaskPriorities{
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}
export type TaskType={
    description: string
    title: string
    status: TaskStatuses
    priority:TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate:string
}
type GetTasksResponse={
    items: TaskType[]
    totalCount: number
    error:string|null
}
type UpdateTaskModelType={
    title: string
    description: string
       status:number
    priority: number
    startDate: string
    deadline:string
}
export const todolistsApi = {
    getTodolist() {
       return  instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item:   TodolistType}>>(`todo-lists`, {title})
    },
    deleteTodolist(id:string){
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id:string,title:string){
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTask(todolistId:string){
        return  instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string,taskId:string){
        return  instance.get<ResponseType>(`todo-lists/${todolistId}/tasks/${{taskId}}`)
    },
    createTask(todolistId:string,title:string){
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(id:string,taskId:string,model: UpdateTaskModelType){
        return instance.put<GetTasksResponse>(`todo-lists/${id}`, {model})
    },

}