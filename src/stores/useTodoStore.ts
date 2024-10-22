import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(devtools((set) => ({
  todos: [],

  fetchTodos: async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data = await res.json();
      set({ todos: data }, false, 'fetchTodos')
    } catch (error) {
      console.log(error);
    }
  },

  addTask: (title: string) => {
    if (title.trim() === "") {
      return;
    }

    const data: Todo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    set((state) => ({
      todos: [...state.todos, data]
    }), false, 'addTask');
  },

  deleteTask: (id: number) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }), false, 'deleteTask')
  },

  toggleCompletion: (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }), false, 'toggleCompletion')
  },
})))
