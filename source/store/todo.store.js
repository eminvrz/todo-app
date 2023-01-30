import { Todo } from '../todos/models/todo.model'

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}


const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore ');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state')); 
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    //console.log(JSON.stringify(state));
    localStorage.setItem('state', JSON.stringify(state));

}

const getTodos = (filter = Filters.All) => {
    switch ( filter ){
        case Filters.All:
            return [...state.todos]; // regresar un nuevo arreglo con cada uno de sus valores

        case Filters.Completed:
            return state.todos.filter(todo => todo.done); // Los que esten hechos

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); // Los que esten en negacion 

        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if( !description) throw new Error('Description is required');
    state.todos.push( new Todo(description));

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toogleTodo = ( todoId ) => {
    // con este map barremos todos los esten en el arreglo hasta encontrar el todoId
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId) {
            todo.done = !todo.done; // cambiar el valor opuesto que tenga el valor todo.done
        }
        return todo;
    });
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId); // Eliminar el todoid que nos esta mandando, diferente a todos los demas
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done); // Eliminar todos los que esten completados
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toogleTodo,
}