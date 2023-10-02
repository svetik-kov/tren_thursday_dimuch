import React, {useCallback, useEffect} from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import {TaskStatuses, TaskType, todolistsApi, TodolistType} from '../api/todolists-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {InitializedTC, RequestStatusType} from './app-reducer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logOutTC} from '../features/TodolistsList/login-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false, ...props}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const isLoginIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(InitializedTC())
    }, [])
    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])
    /*const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
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
        /!*const action = addTodolistAC(title);
        dispatch(action)*!/;
    }, [dispatch]);*/
    if (!isInitialized) {
        return <div style={{position: 'absolute', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress color="secondary"/>
        </div>
    }



    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">

                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoginIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                    {/*     <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {

                     todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>*/}
                </Container>
            </div>
        </BrowserRouter>
    );
}

/*type TodolistsListType = {
    todolists: Array<TodolistDomainType>
}*/


export default App;
