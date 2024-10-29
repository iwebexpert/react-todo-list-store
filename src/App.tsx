import "./App.css";
import CustomStoreComponent from "./components/CustomStoreComponent";
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "./contexts/ThemeContext";
// import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <ThemeProvider>
      {/* <TodoProvider> */}
      <div>
        <CustomStoreComponent />
        <hr />
        <ThemeSwitch />
        <hr />
        <Header />
        <hr />
        <TodoList />
      </div>
      {/* </TodoProvider> */}
    </ThemeProvider>
  );
}

export default App;
