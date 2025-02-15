"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
} from "../../services/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  // Para cada tarea, almacenamos el título de la nueva subtarea en un objeto (clave = task._id)
  const [newSubtasks, setNewSubtasks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTasks(token)
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [router]);

  // Funciones para tareas principales
  const handleCreateTask = async () => {
    const token = localStorage.getItem("token");
    if (!newTaskTitle.trim()) return;
    try {
      const newTask = await createTask({ title: newTaskTitle }, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Error al crear la tarea", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error al eliminar la tarea", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setEditedTaskTitle(task.title);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskTitle("");
  };

  const handleSaveEdit = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const updatedTask = await updateTask(taskId, { title: editedTaskTitle }, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setEditingTaskId(null);
      setEditedTaskTitle("");
    } catch (err) {
      console.error("Error al actualizar la tarea", err);
    }
  };

  const handleToggleStatus = async (task) => {
    const token = localStorage.getItem("token");
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      const updatedTask = await updateTask(task._id, { title: task.title, status: newStatus }, token);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      console.error("Error al cambiar el estado de la tarea", err);
    }
  };

  // Funciones para subtareas
  const handleNewSubtaskChange = (taskId, value) => {
    setNewSubtasks((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleAddSubtask = async (taskId) => {
    const token = localStorage.getItem("token");
    const title = newSubtasks[taskId];
    if (!title || !title.trim()) return;
    try {
      const updatedTask = await createSubtask(taskId, { title }, token);
      // Actualiza la tarea en la lista con las nuevas subtareas
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setNewSubtasks((prev) => ({ ...prev, [taskId]: "" }));
    } catch (err) {
      console.error("Error al agregar la subtarea", err);
    }
  };

  const handleToggleSubtaskStatus = async (taskId, subtask) => {
    const token = localStorage.getItem("token");
    const updatedStatus = subtask.status === "pending" ? "completed" : "pending";
    try {
      const updatedTask = await updateSubtask(taskId, subtask._id, { status: updatedStatus }, token);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error al cambiar el estado de la subtarea", err);
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    const token = localStorage.getItem("token");
    try {
      const updatedTask = await deleteSubtask(taskId, subtaskId, token);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error al eliminar la subtarea", err);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Tareas</h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <span className="text-lg font-semibold">Cargando...</span>
        </div>
      ) : (
        <>
          {/* Formulario para crear una nueva tarea */}
          <div className="mb-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Nueva tarea..."
              className="border p-2 rounded mr-2"
            />
            <button onClick={handleCreateTask} className="bg-blue-500 text-white p-2 rounded">
              Agregar Tarea
            </button>
          </div>

          {/* Listado de tareas */}
          <div>
            {tasks.length === 0 ? (
              <p>No hay tareas.</p>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className="border p-2 mb-4">
                  <div className="flex justify-between items-center">
                    {editingTaskId === task._id ? (
                      <>
                        <input
                          type="text"
                          value={editedTaskTitle}
                          onChange={(e) => setEditedTaskTitle(e.target.value)}
                          className="border p-1"
                        />
                        <button
                          onClick={() => handleSaveEdit(task._id)}
                          className="bg-green-500 text-white p-1 rounded ml-2"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white p-1 rounded ml-2"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-lg">{task.title}</h2>
                          <p>Estatus: {task.status}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleEditTask(task)}
                            className="bg-yellow-500 text-white p-2 rounded mr-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleToggleStatus(task)}
                            className="bg-blue-500 text-white p-2 rounded mr-2"
                          >
                            Cambiar Estado
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Gestión de Subtareas */}
                  <div className="mt-4 ml-4">
                    <h3 className="text-md font-semibold">Subtareas</h3>
                    {task.subtasks && task.subtasks.length > 0 ? (
                      task.subtasks.map((subtask, idx) => (
                        <div key={idx} className="flex items-center justify-between border p-1 mt-1">
                          <span className={`text-sm ${subtask.status === "completed" ? "line-through" : ""}`}>
                            {subtask.title}
                          </span>
                          <div>
                            <button
                              onClick={() => handleToggleSubtaskStatus(task._id, subtask)}
                              className="bg-blue-500 text-white p-1 rounded mr-1 text-xs"
                            >
                              Toggle
                            </button>
                            <button
                              onClick={() => handleDeleteSubtask(task._id, subtask._id)}
                              className="bg-red-500 text-white p-1 rounded text-xs"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm">No hay subtareas.</p>
                    )}
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        value={newSubtasks[task._id] || ""}
                        onChange={(e) => handleNewSubtaskChange(task._id, e.target.value)}
                        placeholder="Agregar subtarea..."
                        className="border p-1 rounded mr-2 text-sm"
                      />
                      <button
                        onClick={() => handleAddSubtask(task._id)}
                        className="bg-green-500 text-white p-1 rounded text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
}
