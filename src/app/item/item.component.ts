import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngxs/store';
import { DeleteTodo, CheckedTodo } from '../state/todo.actions';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputReference', { static: true }) inputElement: ElementRef;

  textTodo: FormControl;

  isEditing: boolean;

  constructor(private store: Store, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.textTodo = new FormControl(this.todo.name, Validators.required);
  }

  onChecked(): void {
    const todo = { ...this.todo };
    todo.isChecked = !todo.isChecked;
    this.store.dispatch(new CheckedTodo(todo));
  }

  onDelete(): void {
    this.store.dispatch(new DeleteTodo(this.todo.id));
  }

  onEdit(): void {
    this.isEditing = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.inputElement.nativeElement).select();
    }, 0);
  }

  onSubmit(): void {
    if (this.textTodo.valid) {
      const todo = { ...this.todo };
      this.isEditing = false;
      todo.name = this.textTodo.value;
      this.store.dispatch(new CheckedTodo(todo));
    }
  }

}
