// src/components/TodoItem.jsx
import "./TodoList.css";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <span className="todo-text" data-testid={`todo-text-${todo.id}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        data-testid={`delete-btn-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;