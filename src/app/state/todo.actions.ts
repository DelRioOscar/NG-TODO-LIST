import { Todo } from '../models/todo.model';

export class AddTodo {
  static readonly type = '[Todo] Add TODO';
  constructor(public todo: Todo) { }
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete TODO';
  constructor(public id: string) { }
}

export class CheckedTodo {
  static readonly type = '[Todo] Checked TODO';
  constructor(public todo: Todo) { }
}

export class ChangeMode {
  static readonly type = '[Todo] Change Mode TODO';
  constructor(public mode: string) { }
}

export class ClearCompleted {
  static readonly type = '[Todo] Clear Completed TODO';
  constructor() { }
}

export class MarkAllCompleted {
  static readonly type = '[Todo] Mark All Completed TODO';
  constructor() { }
}
