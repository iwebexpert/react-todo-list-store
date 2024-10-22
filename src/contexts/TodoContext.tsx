import React, { createContext, useContext, useState } from "react";

interface TodoContextType {
  todos: Todo[];
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
  setInitialTodos: (todos: Todo[]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Добавление новой задачи
  const addTask = (title: string) => {
    if (title.trim() === "") {
      return;
    }

    const data: Todo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTodos([data, ...todos]);
  };

  // Удаление задачи
  const deleteTask = (id: number) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  // Обновление статуса
  const toggleCompletion = (id: number) => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Установка начальных задач
  const setInitialTodos = (todos: Todo[]) => {
    setTodos(todos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTask, deleteTask, toggleCompletion, setInitialTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext должен использоваться с Provider");
  }
  return context;
};
