import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistTC, FilterValuesType,
    removeTodolistTC, TodolistDomainType
} from '../features/TodolistsList/todolists-reducer';
import {
    addTasksTC,
    removeTasksTC, updateTaskTC
} from '../features/TodolistsList/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import {TaskStatuses, TaskType, todolistsApi, TodolistType} from '../api/todolists-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList />
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
    );
}

/*type TodolistsListType = {
    todolists: Array<TodolistDomainType>
}*/


export default App;
