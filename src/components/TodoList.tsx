import { useEffect, useLayoutEffect, useState } from "react";
import TotoItem from "./TotoItem";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    // Асинхронный, выполняется после отрисовки
    console.log("useEffect");

    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  // Добавление новой задачи
  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const data: Todo = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTodos([data, ...todos]);
    setNewTask("");
  };

  useLayoutEffect(() => {
    // Синхронный код
    console.log("useLayoutEffect");
  }, []);

  // useEffect(() => {
  //   console.log(`Введено в поле: ${newTask}`);
  // }, [newTask]);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLocaleLowerCase().includes(debouncedSearchValue.toLocaleLowerCase())
  );

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Список задач</h1>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Введите название для новой задачи"
        />
        <button onClick={addTask}>Добавить задачу</button>
      </div>

      <SearchInput searchData={searchInput} setSearchData={setSearchInput} />

      <ul style={{ marginTop: "30px" }}>
        {filteredTodos.map((todo) => (
          <TotoItem
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            deleteTask={deleteTask}
            toggleCompletion={toggleCompletion}
            key={todo.id}
          />
        ))}
      </ul>
    </div>
  );
}
