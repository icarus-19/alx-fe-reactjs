// src/__tests__/TodoList.test.js
import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component - Initial Render", () => {
  test("renders TodoList component with correct title", () => {
    render(<TodoList />);
    
    // Check if the title is rendered
    const title = screen.getByText(/Todo List/i);
    expect(title).toBeInTheDocument();
  });

  test("renders initial demo todos correctly", () => {
    render(<TodoList />);
    
    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a todo app")).toBeInDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    
    // Should have 3 todo items initially
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(3);
  });

  test("first todo is marked as completed initially", () => {
    render(<TodoList />);
    
    // Get the checkbox for the first todo
    const firstTodoCheckbox = screen.getByTestId("todo-checkbox-1");
    expect(firstTodoCheckbox).toBeChecked();
    
    // Check if the text has line-through (completed style)
    const firstTodoText = screen.getByTestId("todo-text-1");
    expect(firstTodoText).toHaveClass("completed");
  });
});