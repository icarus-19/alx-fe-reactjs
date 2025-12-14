import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  const mockTodos = [
    { id: 1, text: 'Todo 1', completed: false, priority: 'high', createdAt: new Date() },
    { id: 2, text: 'Todo 2', completed: true, priority: 'medium', createdAt: new Date() },
    { id: 3, text: 'Todo 3', completed: false, priority: 'low', createdAt: new Date() },
  ];

  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockEditTodo = jest.fn();

  beforeEach(() => {
    mockToggleTodo.mockClear();
    mockDeleteTodo.mockClear();
    mockEditTodo.mockClear();
  });

  test('renders todos when list is not empty', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  test('renders empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    expect(screen.getByText('No todos found')).toBeInTheDocument();
    expect(screen.getByText('Add a new todo above or try changing your filter!')).toBeInTheDocument();
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  test('renders correct number of todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(3);
  });

  test('passes correct props to TodoItem components', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    // Each todo should be rendered with its text
    mockTodos.forEach(todo => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  test('empty state has correct styling classes', () => {
    render(
      <TodoList
        todos={[]}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    const emptyState = screen.getByText('No todos found').closest('.empty-state');
    expect(emptyState).toBeInTheDocument();
  });
});