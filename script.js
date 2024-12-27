let currentIndex = 0; // Índice para el control de carga
const itemsPerLoad = 6; // Número de imágenes a cargar cada vez
let images = []; // Array para almacenar las imágenes

// Función para cargar imágenes desde imagen.json
async function loadImageData() {
    const response = await fetch('imagen.json');
    
    if (!response.ok) {
        console.error("Error al cargar el archivo JSON:", response.statusText);
        return; // Salir si hay un error en la carga
    }

    images = await response.json();
    
    loadImages(); // Cargar las imágenes después de obtener los datos
}

// Función para cargar imágenes en la galería
function loadImages() {
    const gallery = document.getElementById('gallery');

    // Cargar las imágenes según el índice actual
    for (let i = currentIndex; i < currentIndex + itemsPerLoad && i < images.length; i++) {
        const imgElement = document.createElement('img');
        imgElement.src = images[i].thumbnail; // Usar thumbnail en lugar de url
        imgElement.alt = images[i].tags.join(', '); // Usar tags como texto alternativo
        imgElement.classList.add('thumbnail');

        // Crear un enlace para cada imagen
        const linkElement = document.createElement('a');
        linkElement.href = images[i].url; // URL del contenido
        linkElement.target = "_blank"; // Abrir en nueva pestaña
        linkElement.appendChild(imgElement);
        
        gallery.appendChild(linkElement);
        
        currentIndex++; // Actualizar el índice para la próxima carga

        // Si no hay más imágenes, ocultar el botón "Cargar más"
        if (currentIndex >= images.length) {
            document.getElementById('load-more').style.display = 'none';
            break; // Salir del bucle si no hay más imágenes
        }
    }
}

document.getElementById('load-more').addEventListener('click', loadImages);

// Cargar los datos de la imagen al inicio
loadImageData();
