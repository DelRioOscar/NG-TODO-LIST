import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TodoEnum } from '../enums/todo.enum';
import { Todo } from '../models/todo.model';
import { ChangeMode, ClearCompleted } from '../state/todo.actions';
import { TodoState } from '../state/todo.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Select(TodoState.modes) todos$: Observable<Todo[]>;
  typeSelected = 'Todos';

  constructor(private store: Store) { }

  ngOnInit(): void { }

  selectedType(type: string): void {
    this.typeSelected = type;
    this.store.dispatch(new ChangeMode(TodoEnum[type]));
  }

  onReset() {
    this.store.dispatch(ClearCompleted);
  }

}
