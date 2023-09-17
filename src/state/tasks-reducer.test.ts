import {addTaskAC, setTasksAC, tasksReducer} from './tasks-reducer';
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

test('correct task should be added to correct array', () => {


    //const action = addTaskAC('juce', 'todolistId2')
    const action = addTaskAC({
        title:'juce',
        todoListId:'todolistId2',
        status: TaskStatuses.New,
        id:'id exist',
        order:0,
        addedDate:'',
        priority: TaskPriorities.Low,
        startDate:'',
        deadline:'',
        description:''
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
