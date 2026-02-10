import { Component, signal, OnInit } from '@angular/core';
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
export class App implements OnInit {
  todos = signal<ITodo[]>([]);
  todoTitle: string = '';
  filteredtodos = signal<ITodo[]>([]);
  isfilterdatapresent=signal<boolean>(true);
  
  
  ngOnInit(): void {
     const localstoragedata=localStorage.getItem('todos');
     if(localstoragedata){
       const parsedata=JSON.parse(localstoragedata);
       this.todos.set(parsedata);
       this.filteredtodos.set(parsedata);
     }
  }
  
  addTodo() {
    const taskobj = {
      id: this.todos().length + 1,
      title: this.todoTitle,
      status: 'pending',
    } as ITodo;

    this.todos.update((prev) => [...prev, taskobj]);
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }

  filterTodos(todotitle:string){
    const filterdata = this.todos().filter((todo) => todo.title.toLowerCase().startsWith(todotitle.toLowerCase()));
    if(filterdata.length>0){
      this.filteredtodos.set(filterdata);
      this.isfilterdatapresent.set(true);
    }else{
      this.isfilterdatapresent.set(false);
    }
  }
  
}


export interface ITodo {
  id: number;
  title: string;
  status: 'pending' | 'on-hold' | 'completed';
}
