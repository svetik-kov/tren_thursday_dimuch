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
type TaskType={
    description: string
    title: string
    completed: boolean
    status: number
    priority:number
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
type UpdateTaskType={
    title: string
    description: string
    completed: boolean
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
        return instance.post<GetTasksResponse>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(id:string,taskId:string,status:UpdateTaskType){
        return instance.put<GetTasksResponse>(`todo-lists/${id}`, {status})
    },

}