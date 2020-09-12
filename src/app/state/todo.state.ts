import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

import { AddTodo, DeleteTodo, CheckedTodo, ChangeMode, ClearCompleted, MarkAllCompleted } from './todo.actions';
import { Todo } from '../models/todo.model';
import { TodoEnum } from '../enums/todo.enum';


export class TodoStateModel {
  todos: Todo[];
  mode: string;
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
    mode: 'TODOS'
  }
})

@Injectable()
export class TodoState {

  @Selector()
  static getMode(state: TodoStateModel): string {
    return state.mode;
  }

  @Selector([TodoState.getMode])
  static modes(state: TodoStateModel, mode: string): Todo[] {
    let stateResult: Todo[];
    switch (mode) {
      case 'PENDIENTES':
        stateResult = state.todos.filter(s => !s.isChecked);
        break;

      case 'COMPLETADOS':
        stateResult = state.todos.filter(s => s.isChecked);
        break;

      case 'TODOS':
        stateResult = state.todos;
        break;
    }
    return stateResult;
  }


  @Action(AddTodo)
  add({ getState, setState }: StateContext<TodoStateModel>, { todo }: AddTodo): void {
    const state = getState();
    setState({
      ...state,
      todos: [...state.todos, todo]
    });
  }

  @Action(DeleteTodo)
  delete({ setState }: StateContext<TodoStateModel>, { id }: DeleteTodo): void {
    setState(
      patch({
        todos: removeItem<Todo>(t => t.id === id)
      })
    );
  }

  @Action(CheckedTodo)
  checked({ setState }: StateContext<TodoStateModel>, { todo }: CheckedTodo): void {
    setState(
      patch({
        todos: updateItem<Todo>(t => t.id === todo.id, todo)
      })
    );
  }

  @Action(ChangeMode)
  changeMode({ getState, setState }: StateContext<TodoStateModel>, mode: ChangeMode): void {
    const state = getState();
    setState({
      ...state,
      mode: mode.mode
    });
  }

  @Action(ClearCompleted)
  clearCompleted({ getState, setState }: StateContext<TodoStateModel>): void {
    const state = getState();
    setState({
      ...state,
      todos: [...state.todos.filter(s => !s.isChecked)]
    });
  }

  @Action(MarkAllCompleted)
  markAllCompleted({ getState, setState }: StateContext<TodoStateModel>): void {
    const state = getState();
    setState({
      ...state,
      todos: [...state.todos.map(t => {
        const todo = { ...t };
        todo.isChecked = !todo.isChecked;
        return todo;
      })]
    });
  }
}
