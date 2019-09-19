import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  message;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(t => this.todos = t);
  }

  add() {
    var newTodo = { title: '... ' };
    this.todoService.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  getTodosWithPromise() {
    return new Promise(() => null);
  }

  delete(id) {
    if (confirm('Are you sure?'))
      this.todoService.delete(id).subscribe();
  }
}
