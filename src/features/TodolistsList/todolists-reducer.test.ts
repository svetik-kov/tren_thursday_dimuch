import {changeTodolistEntityStatusAC, setTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from '../../app/app-reducer';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})
test('todolists should be set to the state', () => {
    const action = setTodolistAC(startState)
    const endState = todolistsReducer([], action)
    expect(endState.length).toBe(2)
})

test('correct status of todolist  should be change', () => {
    let newStatus: RequestStatusType = 'loading'


    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})