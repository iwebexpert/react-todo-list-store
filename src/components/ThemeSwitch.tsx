import { useTheme } from '../contexts/ThemeContext'

export default function ThemeSwitch() {
  const {theme, toggleTheme} = useTheme()

  return (
    <div>
      <div>Текущая тема: {theme}</div>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  )
}
