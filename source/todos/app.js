import todoStore from "../store/todo.store"
import html from './app.html?raw'
import { renderTodos } from './use-cases'


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',

}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        //console.log(todos);
        renderTodos( ElementIDs.TodoList, todos);
    }

    // Cuando la funcion  App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app);
        displayTodos();
    }) ();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector(ElementIDs.TodoList);

    // Listeners
        // para agregar un nuevo todo
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

        // para marcar si ya esta echo ese todo o viceversa
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toogleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

}