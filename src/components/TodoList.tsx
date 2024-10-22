import { useEffect, useState } from "react";
import TotoItem from "./TotoItem";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import { useTodoContext } from "../contexts/TodoContext";

export default function TodoList() {
  const { todos, addTask, toggleCompletion, deleteTask, setInitialTodos } =
    useTodoContext();
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
        setInitialTodos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // useLayoutEffect(() => {
  //   // Синхронный код
  //   console.log("useLayoutEffect");
  // }, []);

  // useEffect(() => {
  //   console.log(`Введено в поле: ${newTask}`);
  // }, [newTask]);

  const filteredTodos = todos.filter((todo) =>
    todo.title
      .toLocaleLowerCase()
      .includes(debouncedSearchValue.toLocaleLowerCase())
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
        <button onClick={() => addTask(newTask)}>Добавить задачу</button>
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
