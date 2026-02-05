import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface ITodo {
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
  todos = signal<ITodo[]>([]);
  todoTitle: string = '';
  
  addTodo() {
    const taskobj = {
      id: this.todos().length + 1,
      title: this.todoTitle,
      status: 'pending',
    } as ITodo;

    this.todos.update((prev) => [...prev, taskobj]);
  }
  
}


export interface ITodo {
  id: number;
  title: string;
  status: 'pending' | 'on-hold' | 'completed';
}
