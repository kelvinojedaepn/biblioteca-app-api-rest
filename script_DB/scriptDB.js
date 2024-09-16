const admin = require('firebase-admin');
const serviceAccount = require('../config/credentials.json');

// Inicializamos Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "web-page-back"
});

// Acceso a Firestore
const db = admin.firestore();

// Lista de libros
const books = [
    {
        title: "El Quijote",
        author: "Miguel de Cervantes",
        year: 1605,
        genre: "Novela",
        language: "Español",
        description: "Las aventuras de un hidalgo español obsesionado con las novelas de caballería."
    },
    {
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        year: 1967,
        genre: "Realismo mágico",
        language: "Español",
        description: "La historia épica de la familia Buendía en el mítico pueblo de Macondo."
    },
    {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Distopía",
        language: "Inglés",
        description: "Una novela sobre una sociedad controlada por un gobierno totalitario que vigila cada movimiento."
    },
    {
        title: "Matar a un ruiseñor",
        author: "Harper Lee",
        year: 1960,
        genre: "Ficción",
        language: "Inglés",
        description: "Una novela sobre la injusticia racial en el sur de los Estados Unidos durante los años 30."
    },
    {
        title: "El principito",
        author: "Antoine de Saint-Exupéry",
        year: 1943,
        genre: "Fábula",
        language: "Francés",
        description: "La historia de un joven príncipe que explora el universo y aprende valiosas lecciones de vida."
    },
    {
        title: "Orgullo y prejuicio",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance",
        language: "Inglés",
        description: "Una crítica social de la Inglaterra del siglo XIX a través de la historia de amor entre Elizabeth Bennet y Mr. Darcy."
    },
    {
        title: "Crimen y castigo",
        author: "Fiódor Dostoyevski",
        year: 1866,
        genre: "Filosófica",
        language: "Ruso",
        description: "La historia de un estudiante empobrecido que planea un asesinato para comprobar su propia moralidad."
    },
    {
        title: "La Odisea",
        author: "Homero",
        year: "Siglo VIII a.C.",
        genre: "Épica",
        language: "Griego",
        description: "Las aventuras del héroe Odiseo en su regreso a Ítaca después de la guerra de Troya."
    },
    {
        title: "Donde los árboles cantan",
        author: "Laura Gallego",
        year: 2011,
        genre: "Fantasía",
        language: "Español",
        description: "Una joven noble se embarca en un viaje lleno de magia y peligro en busca de respuestas sobre su reino."
    },
    {
        title: "El hombre en busca de sentido",
        author: "Viktor Frankl",
        year: 1946,
        genre: "Psicología",
        language: "Alemán",
        description: "Una reflexión sobre la vida y el sufrimiento basada en la experiencia de Viktor Frankl en los campos de concentración nazis."
    }
];

// Función para agregar los libros a Firestore
const addBooksToFirestore = async () => {
    try {
        for (const book of books) {
            await db.collection('books').add(book);
        }
        console.log('Libros agregados a Firebase correctamente');
    } catch (error) {
        console.error('Error al agregar los libros a Firebase:', error);
    }
};

addBooksToFirestore();
