require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db'); // Conexión a la base de datos

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
