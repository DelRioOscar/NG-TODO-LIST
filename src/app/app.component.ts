import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AddTodo, MarkAllCompleted } from './state/todo.actions';
import { Todo } from './models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoState } from './state/todo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos$: Observable<Todo[]>;
  @Select(state => state.todo.mode) modes$: Observable<{ mode: string }>;

  todo: FormControl;

  constructor(private store: Store) {
    this.todo = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    this.todos$ = this.store.select(TodoState.modes);
  }

  markAll(): void{
    this.store.dispatch(MarkAllCompleted);
  }

  onSubmit(): void {
    if (this.todo.valid) {
      const todo = new Todo();

      todo.isChecked = false;
      todo.name = this.todo.value;

      this.store.dispatch(new AddTodo(todo));
      this.todo.reset();
    }
  }

}
