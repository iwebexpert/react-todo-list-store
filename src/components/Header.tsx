import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { theme } = useTheme();
  return (
    <div>
      <h2>Header</h2>
      <div>Theme: {theme}</div>
    </div>
  );
}
