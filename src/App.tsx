import "./App.css";
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div>
          <Header />
          <ThemeSwitch />
          <hr />
          <TodoList />
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
