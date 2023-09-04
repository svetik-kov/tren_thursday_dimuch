import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistsApi} from '../api/todolists-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '31250932-6c2f-4b49-9f3f-4f94da6b2415'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolist()
            //axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
/*export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('Dimych ')
        .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodolist = () => {
        todolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'text'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>Add todolist</button>
        </div>
    </div>
}
/*export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a7fc50e8-b71f-4ce8-bfc8-22bb2f9257b8'
        todolistsApi.deleteTodolist(todolistId)
            //axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId,setTodolistId]=useState<string>('')
    const deleteTodolist=()=>{
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
        return <div>
            {JSON.stringify(state)}
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
    <button onClick={deleteTodolist}>Delete todolist</button>
    </div>
}
/*export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '727a0df7-3904-48d2-a8bc-4606b94e0d7a'
        todolistsApi.updateTodolist(todolistId, 'New TODO')
            //axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'New TODO'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodolistTitle=()=>{
        todolistsApi.updateTodolist(todolistId, title)
           .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'New text'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTodolistTitle}> Update title todolist</button>
    </div>
}

/*export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="3779d53a-5c5a-4810-9f65-c24ddbe8e83e"
        todolistsApi.getTask(todolistId)
            //axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}*/
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTask = () => {
        todolistsApi.getTask(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTask}>Get task</button>
        </div>
    </div>
}
/*export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="3779d53a-5c5a-4810-9f65-c24ddbe8e83e"
        const taskId=''
        todolistsApi.deleteTask(todolistId,taskId)
            //axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}*/
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            //axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}
/*export const CreatTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId="2b2b2ec5-66a0-49fa-82a6-db7f38bfc5fb"
        const title='hello'
        todolistsApi.createTask(todolistId,title)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}*/
export const CreatTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const creatTask = () => {
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'text'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={creatTask}> Add task</button>
        </div>
    </div>
}
/*export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2b2b2ec5-66a0-49fa-82a6-db7f38bfc5fb'
        const taskId = '2fddf860-7cca-4ac1-95b4-8cb2c1704e60'
        let updateStatus = {
            title: 'new task',
            description: 'new',
            completed: true,
            status: 0,
            priority: 1,
            startDate: 'string',
            deadline: 'string',
        }
        todolistsApi.updateTask(todolistId, taskId, updateStatus)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask=()=>{
        todolistsApi.updateTask(todolistId, taskId, {
            title,description,status,priority,startDate,deadline
        })
            .then((res) => {
                setState(res.data)
            })
    }

    useEffect(() => {
        const todolistId = '2b2b2ec5-66a0-49fa-82a6-db7f38bfc5fb'
        const taskId = '2fddf860-7cca-4ac1-95b4-8cb2c1704e60'
        let updateStatus = {
            title: 'new task',
            description: 'new',
            completed: true,
            status: 0,
            priority: 1,
            startDate: 'string',
            deadline: 'string',
        }
        todolistsApi.updateTask(todolistId, taskId, updateStatus)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder={'description'} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder={'status'} type={'number'} value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'priority'} value={priority} onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <input placeholder={'startDate'} value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
            <input placeholder={'deadline'} value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
<button onClick={updateTask}>Update task</button>
        </div>
    </div>
}