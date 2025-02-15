const Task = require('../models/Task');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if(!title) {
      return res.status(400).json({ msg: "El título es obligatorio" });
    }

    const newTask = new Task({
      title,
      user: req.user.userId
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la tarea" });
  }
};

// Obtener todas las tareas del usuario
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener tareas" });
  }
};

// Actualizar una tarea (título, status, etc.)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    if(status === 'completed') {
      const taskToCheck = await Task.findById(id);
      const anyPending = taskToCheck.subtasks.some(sub => sub.status === 'pending');
      if(anyPending) {
        return res.status(400).json({
          msg: "No se puede marcar la tarea como completada si existen subtareas pendientes"
        });
      }
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, status },
      { new: true }
    );

    if(!updatedTask) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.userId });
    if(!deletedTask) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la tarea" });
  }
};

// Crear una subtarea
exports.createSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if(!title) {
      return res.status(400).json({ msg: "El título de la subtarea es obligatorio" });
    }
    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if(!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    task.subtasks.push({ title });
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la subtarea" });
  }
};

// Actualizar una subtarea
exports.updateSubtask = async (req, res) => {
  try {
    const { id, subtaskId } = req.params;
    const { title, status } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if(!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    const subtask = task.subtasks.id(subtaskId);
    if(!subtask) {
      return res.status(404).json({ msg: "Subtarea no encontrada" });
    }
    // Actualizar campos si se envían en el cuerpo de la petición
    if(title !== undefined) subtask.title = title;
    if(status !== undefined) subtask.status = status;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error en updateSubtask:", error);
    res.status(500).json({ msg: "Error al actualizar la subtarea", error: error.message });
  }
};

// Eliminar una subtarea
exports.deleteSubtask = async (req, res) => {
  try {
    const { id, subtaskId } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    
    // Buscar la subtarea. Si no existe, retorna un 404.
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
      console.error("Subtarea no encontrada en la tarea:", task.subtasks);
      return res.status(404).json({ msg: "Subtarea no encontrada" });
    }
    
    // Usamos el método pull() para eliminar la subtarea por su _id.
    task.subtasks.pull(subtaskId);
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error en deleteSubtask:", error);
    res.status(500).json({ msg: "Error al eliminar la subtarea", error: error.message });
  }
};

// Agregar un comentario
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if(!text) {
      return res.status(400).json({ msg: "El comentario no puede estar vacío" });
    }
    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if(!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    task.comments.push({ text });
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al agregar el comentario" });
  }
};

// Editar un comentario
exports.updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;
    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if(!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    const comment = task.comments.id(commentId);
    if(!comment) {
      return res.status(404).json({ msg: "Comentario no encontrado" });
    }
    comment.text = text;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el comentario" });
  }
};

// Eliminar un comentario
exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if(!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    const comment = task.comments.id(commentId);
    if(!comment) {
      return res.status(404).json({ msg: "Comentario no encontrado" });
    }
    comment.remove();
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el comentario" });
  }
};
