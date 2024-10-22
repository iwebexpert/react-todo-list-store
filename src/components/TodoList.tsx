import { useEffect, useState } from "react";
import TotoItem from "./TotoItem";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import { useTodoStore } from "../stores/useTodoStore";

export default function TodoList() {
  const { todos, addTask, toggleCompletion, deleteTask, fetchTodos } =
    useTodoStore();
  const [newTask, setNewTask] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos]);

  const addTaskHandle = () => {
    if(!newTask) return

    addTask(newTask)
    setNewTask('')
  }

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
        <button onClick={addTaskHandle}>Добавить задачу</button>
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
