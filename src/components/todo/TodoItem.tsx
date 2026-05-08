import { Button } from "@/src/components/ui/button";
import { api } from "@/src/services/apiClient";

// type Todo = {
//   id: number;
//   title: string;
//   completed: boolean;
//   userId: number;
//   createdAt: string; // or Date depending on API
// };
type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (updated: Todo) => void;
};

export default function TodoItem({ todo, onDelete, onToggle }: Props) {
  const toggle = async () => {
    const res = await api.put(`/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    onToggle(res.data);
  };

  const remove = async () => {
    await api.delete(`/todos/${todo.id}`);
    onDelete(todo.id);
  };

  return (
    <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
      <span className={todo.completed ? "line-through text-gray-400" : ""}>
        {todo.title}
      </span>
      <div className="flex gap-2">
        <Button onClick={toggle}>{todo.completed ? "Undo" : "Done"}</Button>
        <Button onClick={remove}>Delete</Button>
      </div>
    </div>
  );
}
