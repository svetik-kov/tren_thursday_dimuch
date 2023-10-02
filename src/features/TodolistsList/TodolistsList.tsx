import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer';
import React, {useCallback, useEffect} from 'react';
import {addTasksTC, removeTasksTC, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {TasksStateType} from '../../app/App';
import {Navigate} from 'react-router-dom';

type TodolistsListType={
    demo?:boolean
}
export const TodolistsList:React.FC<TodolistsListType> = ({demo=false,...props}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoginIn=useSelector<AppRootStateType,boolean>(state=>state.login.isLoggedIn)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo || !isLoginIn){
            return
        }
        dispatch(fetchTodolistTC())

    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTasksTC(id, todolistId))

    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTasksTC(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskTC(id, {status}, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistTC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleTC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
        /*const action = addTodolistAC(title);
        dispatch(action)*/;
    }, [dispatch]);

   /* if (!isLoginIn){
        return <Navigate to={'/login'}/>
    }*/
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {

                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    //id={tl.id}
                                    //title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    //filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}