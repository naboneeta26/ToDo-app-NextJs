"use client";

import { api } from "@/src/services/apiClient";
import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

// type Todo = {
//   id: number;
//   title: string;
//   completed: boolean;
//   userId: number;
//   createdAt: string; // or Date depending on API
// };

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await api.get<Todo[]>("/todos");
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <div className="space-y-4">
      <TodoForm onAdd={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
          onToggle={(updated) =>
            setTodos((prev) =>
              prev.map((t) => (t.id === updated.id ? updated : t)),
            )
          }
        />
      ))}
    </div>
  );
}
