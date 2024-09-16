const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./config/credentials.json');


const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "web-page-back"
});

// Instancia de Firestore
const db = admin.firestore();

// Rutas
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');

app.use('/books', bookRoutes); // CRUD Libros
app.use('/auth', authRoutes); // Ruta de autenticación

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});