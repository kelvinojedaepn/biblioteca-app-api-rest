const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Ruta para verificar el token de Firebase y obtener los datos del usuario
router.post('/verifyToken', async (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verifica el token de Firebase
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Opcional: Aquí podrías asignar roles adicionales o validar si es admin
        const isAdmin = decodedToken.admin === true;

        // Respuesta al cliente con la información del usuario
        res.status(200).json({
            uid: uid,
            email: decodedToken.email,
            isAdmin: isAdmin,
            message: 'Token verificado correctamente'
        });

    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
});

module.exports = router;
