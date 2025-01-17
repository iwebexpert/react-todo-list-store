interface TotoItemProps extends Todo {
  deleteTask: (id: number) => void;
  toggleCompletion: (id: number) => void;
}

export default function TotoItem({
  id,
  title,
  completed,
  deleteTask,
  toggleCompletion,
}: TotoItemProps) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between" }}>
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => toggleCompletion(id)}
      >
        {title}
      </span>
      <button onClick={() => deleteTask(id)}>Удалить</button>
    </li>
  );
}
