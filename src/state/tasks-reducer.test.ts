import {setTasksAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low,
                startDate: '', deadline: '', order: 0, addedDate: '', todoListId: ''
            },
            {
                id: '2', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low,
                startDate: '', deadline: '', order: 0, addedDate: '', todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'milk', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low,
                startDate: '', deadline: '', order: 0, addedDate: '', todoListId: ''
            },
            {
                id: '2', title: 'coffee', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low,
                startDate: '', deadline: '', order: 0, addedDate: '', todoListId: ''
            },
            {
                id: '3', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low,
                startDate: '', deadline: '', order: 0, addedDate: '', todoListId: 'todolistId2'
            }
        ],
    }
})
test('empty be added when we set tasks', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer(
        {
            'todolistId2': [],
            'todolistId1': []
        }, action)


    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)


})