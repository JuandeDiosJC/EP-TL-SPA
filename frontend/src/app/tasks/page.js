"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchTasks } from "@/services/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirige a login
      router.push("/login");
      return;
    }

    // Obtener las tareas
    fetchTasks(token)
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, [router]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Tareas</h1>
      {tasks.map((task) => (
        <div key={task._id} className="border p-2 mb-2 rounded">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p>Estatus: {task.status}</p>
          {/* Más lógica de subtareas, comentarios, etc. */}
        </div>
      ))}
    </main>
  );
}
