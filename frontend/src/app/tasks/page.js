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
  addComment,
  updateComment,
  deleteComment,
} from "../../services/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Para subtareas
  const [newSubtasks, setNewSubtasks] = useState({});
  const [editingSubtask, setEditingSubtask] = useState({
    taskId: null,
    subtaskId: null,
    newTitle: "",
  });

  // Para comentarios
  const [newComment, setNewComment] = useState({});
  const [editingComment, setEditingComment] = useState({
    taskId: null,
    commentId: null,
    newText: "",
  });

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

  const handleSaveEditSubtask = async (taskId, subtaskId) => {
    const token = localStorage.getItem("token");
    try {
      const updatedTask = await updateSubtask(
        taskId,
        subtaskId,
        { title: editingSubtask.newTitle },
        token
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setEditingSubtask({ taskId: null, subtaskId: null, newTitle: "" });
    } catch (err) {
      console.error("Error al editar la subtarea", err);
    }
  };

  // Funciones para comentarios
  const handleAddComment = async (taskId) => {
    const token = localStorage.getItem("token");
    const text = newComment[taskId];
    if (!text || !text.trim()) return;
    try {
      const updatedTask = await addComment(taskId, { text }, token);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setNewComment((prev) => ({ ...prev, [taskId]: "" }));
    } catch (err) {
      console.error("Error al agregar el comentario", err);
    }
  };

  const handleEditComment = (taskId, comment) => {
    setEditingComment({ taskId, commentId: comment._id, newText: comment.text });
  };

  const handleSaveEditComment = async (taskId, commentId) => {
    const token = localStorage.getItem("token");
    try {
      const updatedTask = await updateComment(taskId, commentId, { text: editingComment.newText }, token);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setEditingComment({ taskId: null, commentId: null, newText: "" });
    } catch (err) {
      console.error("Error al editar el comentario", err);
    }
  };

  const handleDeleteComment = async (taskId, commentId) => {
    const token = localStorage.getItem("token");
    try {
      const updatedTask = await deleteComment(taskId, commentId, token);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error al eliminar el comentario", err);
    }
  };

  // Filtrado de tareas según el estatus
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  return (
    <main className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Mis Tareas</h1>

      {/* Controles de filtrado */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-2">
        <span className="mr-2">Filtrar por estatus:</span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <span className="text-lg font-semibold">Cargando...</span>
        </div>
      ) : (
        <>
          {/* Formulario para crear una nueva tarea */}
          <div className="mb-6 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Nueva tarea..."
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={handleCreateTask}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Agregar Tarea
            </button>
          </div>
          {/* Listado de tareas filtradas */}
          <div className="space-y-6">
            {filteredTasks.length === 0 ? (
              <p className="text-center">No hay tareas.</p>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="border p-4 mb-4 rounded shadow-sm bg-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    {editingTaskId === task._id ? (
                      <>
                        <input
                          type="text"
                          value={editedTaskTitle}
                          onChange={(e) => setEditedTaskTitle(e.target.value)}
                          className="border p-1 mb-2 md:mb-0 flex-1"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(task._id)}
                            className="bg-green-500 text-white p-1 rounded"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white p-1 rounded"
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-xl font-semibold">{task.title}</h2>
                          <p className="text-sm">
                            Estatus:{" "}
                            <span
                              className={
                                task.status === "completed"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }
                            >
                              {task.status}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <button
                            onClick={() => handleEditTask(task)}
                            className="bg-yellow-500 text-white p-2 rounded"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleToggleStatus(task)}
                            className="bg-blue-500 text-white p-2 rounded"
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
                    <h3 className="text-lg font-medium">Subtareas</h3>
                    {task.subtasks && task.subtasks.length > 0 ? (
                      task.subtasks.map((subtask) => {
                        const isEditing =
                          editingSubtask.taskId === task._id &&
                          editingSubtask.subtaskId === subtask._id;
                        return (
                          <div
                            key={subtask._id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between border p-2 mt-2 rounded"
                          >
                            {isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={editingSubtask.newTitle}
                                  onChange={(e) =>
                                    setEditingSubtask({ ...editingSubtask, newTitle: e.target.value })
                                  }
                                  className="border p-1 mb-2 md:mb-0 flex-1"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSaveEditSubtask(task._id, subtask._id)}
                                    className="bg-green-500 text-white p-1 rounded text-xs"
                                  >
                                    Guardar
                                  </button>
                                  <button
                                    onClick={() =>
                                      setEditingSubtask({ taskId: null, subtaskId: null, newTitle: "" })
                                    }
                                    className="bg-gray-500 text-white p-1 rounded text-xs"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <span
                                  className={`text-sm flex-1 ${
                                    subtask.status === "completed"
                                      ? "line-through text-green-600"
                                      : "text-yellow-600"
                                  }`}
                                >
                                  {subtask.title}
                                </span>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                  <button
                                    onClick={() =>
                                      setEditingSubtask({
                                        taskId: task._id,
                                        subtaskId: subtask._id,
                                        newTitle: subtask.title,
                                      })
                                    }
                                    className="bg-yellow-500 text-white p-1 rounded text-xs"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleToggleSubtaskStatus(task._id, subtask)
                                    }
                                    className="bg-blue-500 text-white p-1 rounded text-xs"
                                  >
                                    Tarea Completada
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubtask(task._id, subtask._id)}
                                    className="bg-red-500 text-white p-1 rounded text-xs"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm">No hay subtareas.</p>
                    )}
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        value={newSubtasks[task._id] || ""}
                        onChange={(e) => handleNewSubtaskChange(task._id, e.target.value)}
                        placeholder="Agregar subtarea..."
                        className="border p-1 rounded mr-2 text-sm flex-1"
                      />
                      <button
                        onClick={() => handleAddSubtask(task._id)}
                        className="bg-green-500 text-white p-1 rounded text-sm"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                  {/* Gestión de Comentarios */}
                  <div className="mt-4 ml-4">
                    <h3 className="text-lg font-medium">Comentarios</h3>
                    {task.comments && task.comments.length > 0 ? (
                      task.comments.map((comment) => {
                        const isEditingComment =
                          editingComment.taskId === task._id &&
                          editingComment.commentId === comment._id;
                        return (
                          <div
                            key={comment._id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between border p-2 mt-2 rounded"
                          >
                            {isEditingComment ? (
                              <>
                                <input
                                  type="text"
                                  value={editingComment.newText}
                                  onChange={(e) =>
                                    setEditingComment({ ...editingComment, newText: e.target.value })
                                  }
                                  className="border p-1 text-sm mb-2 md:mb-0 flex-1"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      handleSaveEditComment(task._id, comment._id)
                                    }
                                    className="bg-green-500 text-white p-1 rounded text-xs"
                                  >
                                    Guardar
                                  </button>
                                  <button
                                    onClick={() =>
                                      setEditingComment({ taskId: null, commentId: null, newText: "" })
                                    }
                                    className="bg-gray-500 text-white p-1 rounded text-xs"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <span className="text-sm flex-1">{comment.text}</span>
                                <div className="flex gap-2 mt-2 md:mt-0">
                                  <button
                                    onClick={() => handleEditComment(task._id, comment)}
                                    className="bg-yellow-500 text-white p-1 rounded text-xs"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(task._id, comment._id)}
                                    className="bg-red-500 text-white p-1 rounded text-xs"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm">No hay comentarios.</p>
                    )}
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        value={newComment[task._id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({ ...prev, [task._id]: e.target.value }))
                        }
                        placeholder="Agregar comentario..."
                        className="border p-1 rounded mr-2 text-sm flex-1"
                      />
                      <button
                        onClick={() => handleAddComment(task._id)}
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
