import { Todo } from "../models/todo.model"
import { createTodoHTML } from "./"

/**
 * 
 * @param {String} elementoId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementoId, todos = [] ) => {

    //TODO: REFERENCIA
    const element = document.querySelector( elementoId );

    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    });
}