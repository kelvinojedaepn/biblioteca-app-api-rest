const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Acceso a Firestore
const db = admin.firestore();

// Obtener todos los libros con la opción de filtrar por título, idioma o autor
router.get('/', async (req, res) => {
    try {
        const {title, author, language} = req.query; // Posibles filtros

        let booksRef = db.collection('books');
        let query = booksRef;

        if (title) {
            query = query.where('title', '==', title);
        }
        if (author) {
            query = query.where('author', '==', author);
        }
        if (language) {
            query = query.where('language', '==', language);
        }

        const snapshot = await query.get();
        if (snapshot.empty) {
            return res.status(404).json({message: 'No se encontraron libros'});
        }

        const books = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        res.json(books);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los libros', error});
    }
});

// Obtener un solo libro por ID
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const bookRef = db.collection('books').doc(id);
        const doc = await bookRef.get();

        if (!doc.exists) {
            return res.status(404).json({message: 'Libro no encontrado'});
        }

        res.json({id: doc.id, ...doc.data()});
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el libro', error});
    }
});

// Crear un nuevo libro
router.post('/', async (req, res) => {
    const {title, author, year, genre, language, description} = req.body;

    if (!title || !author || !year || !genre || !language) {
        return res.status(400).json({message: 'Todos los campos son obligatorios'});
    }

    try {
        const newBook = {
            title,
            author,
            year,
            genre,
            language,
            description,
        };
        const bookRef = await db.collection('books').add(newBook);
        res.status(201).json({id: bookRef.id, ...newBook});
    } catch (error) {
        res.status(500).json({message: 'Error al agregar el libro', error});
    }
});

// Actualizar un libro por ID
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, author, year, genre, language, description} = req.body;

    try {
        const bookRef = db.collection('books').doc(id);
        const doc = await bookRef.get();

        if (!doc.exists) {
            return res.status(404).json({message: 'Libro no encontrado'});
        }

        const updatedBook = {
            title: title || doc.data().title,
            author: author || doc.data().author,
            year: year || doc.data().year,
            genre: genre || doc.data().genre,
            language: language || doc.data().language,
            description: description || doc.data().description,
        };

        await bookRef.update(updatedBook);
        res.json({id, ...updatedBook});
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el libro', error});
    }
});

// Eliminar un libro por ID
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const bookRef = db.collection('books').doc(id);
        const doc = await bookRef.get();

        if (!doc.exists) {
            return res.status(404).json({message: 'Libro no encontrado'});
        }

        await bookRef.delete();
        res.json({message: 'Libro eliminado correctamente'});
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el libro', error});
    }
});

module.exports = router;