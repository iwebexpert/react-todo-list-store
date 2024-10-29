import { useTheme } from "../contexts/ThemeContext";
import { pointsAtom } from "../stores/atoms/points";
import { useAtomValue } from "../stores/customStore";
import { useTodoStore } from "../stores/useTodoStore";

export default function Header() {
  const { theme } = useTheme();
  const todos = useTodoStore((state) => state.todos);
  const completed = todos.filter((todo) => todo.completed).length;
  const incompleted = todos.length - completed;

  const points = useAtomValue(pointsAtom);

  return (
    <div>
      <h2>Header</h2>
      <div>Points: {points}</div>
      <div>Theme: {theme}</div>
      <h3>Stat</h3>
      <div>Всего задач: {todos.length}</div>
      <div>Завершенные: {completed}</div>
      <div>В процессе: {incompleted}</div>
    </div>
  );
}
