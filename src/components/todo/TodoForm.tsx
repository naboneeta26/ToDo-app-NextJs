"use client";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { api } from "@/src/services/apiClient";

type Props = {
  onAdd: (todo: Todo) => void;
};
export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      const res = await api.post<Todo>("/todos", { title });
      console.log(res.data);
      onAdd(res.data);
      setTitle("");
    } catch (err) {
      console.error("Error adding todo", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addTodo}>
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add today's tasks..."
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
}
