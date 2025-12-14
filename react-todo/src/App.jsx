import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoStats from './components/TodoStats';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true, priority: 'high', createdAt: new Date('2024-01-01') },
    { id: 2, text: 'Build a Todo App', completed: false, priority: 'medium', createdAt: new Date('2024-01-02') },
    { id: 3, text: 'Write tests', completed: false, priority: 'low', createdAt: new Date('2024-01-03') },
    { id: 4, text: 'Deploy to production', completed: false, priority: 'high', createdAt: new Date('2024-01-04') },
  ]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text, priority) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]); // Add new todo at the beginning
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'high') return todo.priority === 'high';
    if (filter === 'medium') return todo.priority === 'medium';
    if (filter === 'low') return todo.priority === 'low';
    return true;
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>📝 React Todo App</h1>
          <p className="subtitle">A simple yet powerful todo application built with React</p>
        </div>
        <div className="header-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="todo-app">
            <div className="todo-sidebar">
              <div className="sidebar-card">
                <h2>🚀 Features</h2>
                <ul className="features-list">
                  <li>✅ Add todos with priority levels</li>
                  <li>✅ Mark todos as complete/incomplete</li>
                  <li>✅ Edit existing todos</li>
                  <li>✅ Filter by status & priority</li>
                  <li>✅ Delete individual todos</li>
                  <li>✅ Clear all completed todos</li>
                  <li>✅ Statistics and progress tracking</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Local state management</li>
                </ul>
              </div>
              
              <div className="sidebar-card">
                <h2>📊 Quick Stats</h2>
                <TodoStats todos={todos} clearCompleted={clearCompleted} />
              </div>
            </div>

            <div className="todo-main">
              <div className="main-card">
                <div className="card-header">
                  <h2>Your Todos</h2>
                  <div className="todo-count">
                    <span className="count-badge">{todos.length}</span>
                    <span>Total Tasks</span>
                  </div>
                </div>
                
                <TodoForm addTodo={addTodo} />
                <TodoFilter currentFilter={filter} setFilter={setFilter} />
                
                {/* TodoList Component */}
                <TodoList
                  todos={filteredTodos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <div className="footer-content">
          <p>React Todo App &copy; {new Date().getFullYear()} - Built with ❤️ using React</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;