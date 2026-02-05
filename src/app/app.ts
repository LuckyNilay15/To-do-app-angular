import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface Todo {
  id: number;
  title: string;
  status: 'pending' | 'on-hold' | 'completed';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'To-Do List';

  newTodoTitle = signal('');

  todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular', status: 'completed' },
    { id: 2, title: 'Build a To-Do App', status: 'pending' },
    { id: 3, title: 'Fix Bugs', status: 'on-hold' }
  ]);

  filter = signal<'all' | 'pending' | 'on-hold' | 'completed'>('all');

  addTodo() {
    // Logic to be implemented by user
    console.log('Add todo:', this.newTodoTitle());
  }

  changeStatus(id: number, newStatus: 'pending' | 'on-hold' | 'completed') {
    // Logic to be implemented by user
    console.log(`Change status of ${id} to ${newStatus}`);
  }

  deleteTodo(id: number) {
    // Logic to be implemented by user
    console.log('Delete todo:', id);
  }

  setFilter(filter: 'all' | 'pending' | 'on-hold' | 'completed') {
    this.filter.set(filter);
  }

  get filteredTodos() {
    const currentFilter = this.filter();
    if (currentFilter === 'all') {
      return this.todos();
    }
    return this.todos().filter(todo => todo.status === currentFilter);
  }
}
