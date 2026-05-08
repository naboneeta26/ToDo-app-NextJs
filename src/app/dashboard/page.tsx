"use client";

import TodoList from "@/src/components/todo/TodoList";
import { api } from "@/src/services/apiClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);
      } catch {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const logout = async () => {
    await api.post("/auth/logout");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-200 to-purple-300">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Welcome, {user?.name || "User"} 👋
          </h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Todo List
        </h2>

        {/* TODO LIST */}
        <TodoList />
      </div>
    </div>
  );
}
