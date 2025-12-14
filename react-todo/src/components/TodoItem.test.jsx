import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test Todo',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-01'),
  };

  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockEditTodo = jest.fn();
  const mockSetEditingId = jest.fn();

  beforeEach(() => {
    mockToggleTodo.mockClear();
    mockDeleteTodo.mockClear();
    mockEditTodo.mockClear();
    mockSetEditingId.mockClear();
  });

  test('renders todo item with correct content', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('HIGH')).toBeInTheDocument();
    expect(screen.getByText(/Jan 1, 2024/)).toBeInTheDocument();
  });

  test('toggles completion when checkbox is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    const checkbox = screen.getByLabelText('Test Todo');
    await userEvent.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  test('enters edit mode when edit button is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    const editButton = screen.getByTitle('Edit todo');
    await userEvent.click(editButton);

    expect(mockSetEditingId).toHaveBeenCalledTimes(1);
    expect(mockSetEditingId).toHaveBeenCalledWith(1);
  });

  test('enters edit mode on double click', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    const todoText = screen.getByText('Test Todo');
    fireEvent.doubleClick(todoText);

    expect(mockSetEditingId).toHaveBeenCalledTimes(1);
    expect(mockSetEditingId).toHaveBeenCalledWith(1);
  });

  test('deletes todo when delete button is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    const deleteButton = screen.getByTitle('Delete todo');
    await userEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });

  test('shows edit form when isEditing is true', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={true}
        setEditingId={mockSetEditingId}
      />
    );

    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    expect(screen.getByTitle('Save')).toBeInTheDocument();
    expect(screen.getByTitle('Cancel')).toBeInTheDocument();
  });

  test('saves edited todo', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={true}
        setEditingId={mockSetEditingId}
      />
    );

    const input = screen.getByDisplayValue('Test Todo');
    const saveButton = screen.getByTitle('Save');

    await userEvent.clear(input);
    await userEvent.type(input, 'Updated Todo');
    await userEvent.click(saveButton);

    expect(mockEditTodo).toHaveBeenCalledTimes(1);
    expect(mockEditTodo).toHaveBeenCalledWith(1, 'Updated Todo');
    expect(mockSetEditingId).toHaveBeenCalledTimes(1);
    expect(mockSetEditingId).toHaveBeenCalledWith(null);
  });

  test('cancels edit mode', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={true}
        setEditingId={mockSetEditingId}
      />
    );

    const cancelButton = screen.getByTitle('Cancel');
    await userEvent.click(cancelButton);

    expect(mockSetEditingId).toHaveBeenCalledTimes(1);
    expect(mockSetEditingId).toHaveBeenCalledWith(null);
  });

  test('does not save empty todo text', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={true}
        setEditingId={mockSetEditingId}
      />
    );

    const input = screen.getByDisplayValue('Test Todo');
    const saveButton = screen.getByTitle('Save');

    await userEvent.clear(input);
    await userEvent.click(saveButton);

    expect(mockEditTodo).not.toHaveBeenCalled();
  });

  test('shows completed styling when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };

    render(
      <TodoItem
        todo={completedTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    const todoItem = screen.getByText('Test Todo').closest('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  test('shows priority badge with correct styling', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        isEditing={false}
        setEditingId={mockSetEditingId}
      />
    );

    const priorityBadge = screen.getByText('HIGH');
    expect(priorityBadge).toHaveStyle({
      color: '#ff6b6b',
      borderColor: '#ff6b6b',
    });
  });
});