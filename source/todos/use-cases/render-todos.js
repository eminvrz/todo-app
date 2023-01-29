import { Todo } from "../models/todo.model"
import { createTodoHTML } from "./"

let element;

/**
 * 
 * @param {String} elementoId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementoId, todos = [] ) => {

    if( !element)
         element = document.querySelector( elementoId );
    
    if( !element) throw new Error(`Element ${ elementoId} not found`);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    });
}