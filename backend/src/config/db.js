const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Conectado");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error);
        process.exit(1);
    }
};

connectDB();
module.exports = mongoose;
