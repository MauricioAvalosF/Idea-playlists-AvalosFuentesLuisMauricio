const canciones = [
    { titulo: "Sunflower", artista: "Post Malone", color: "#142663" },
    { titulo: "Shape of You", artista: "Ed Sheeran", color: "#207237" },
    { titulo: "Blinding Lights", artista: "The Weeknd", color: "#735226" },
    { titulo: "Levitating", artista: "Dua Lipa", color: "#114703" },
    { titulo: "Dance Monkey", artista: "Tones and I", color: "#776416" },
    { titulo: "Old Town Road", artista: "Lil Nas X", color: "#206622" },
    { titulo: "Rockstar", artista: "DaBaby", color: "#235612" },
    { titulo: "Watermelon Sugar", artista: "Harry Styles", color: "#435730" },
    { titulo: "Senorita", artista: "Shawn Mendes", color: "#377753" },
    { titulo: "Good 4 U", artista: "Olivia Rodrigo", color: "#666132" }
];

document.addEventListener("DOMContentLoaded", () => {
    cargarCanciones();
    cargarPlaylist();
    cargarFavoritas();
});

// Función para cargar las canciones desde el array al HTML
function cargarCanciones() {
    const cancionesDiv = document.getElementById('canciones');
    cancionesDiv.innerHTML = '<h2>Canciones</h2>';

    canciones.forEach((cancion, index) => {
        const cancionDiv = document.createElement('div');
        cancionDiv.classList.add('cancion');
        cancionDiv.style.backgroundColor = cancion.color;
        cancionDiv.innerHTML = `
            <h3>${cancion.titulo}</h3>
            <p>${cancion.artista}</p>
            <button onclick="agregarAPlaylist('${cancion.titulo}', '${cancion.artista}', true, '${cancion.color}')">Agregar al inicio</button>
            <button onclick="agregarAPlaylist('${cancion.titulo}', '${cancion.artista}', false, '${cancion.color}')">Agregar al final</button>
            <button onclick="agregarAFavoritas('${cancion.titulo}', '${cancion.artista}', '${cancion.color}')">Agregar a favoritas</button>
        `;
        cancionesDiv.appendChild(cancionDiv);
    });
}

// Función para agregar una canción a la playlist
function agregarAPlaylist(titulo, artista, alInicio, color) {
    let playlist = JSON.parse(sessionStorage.getItem('playlist')) || [];
    const cancion = { titulo, artista, color };

    if (alInicio) {
        playlist.unshift({ ...cancion }); 
    } else {
        playlist.push({ ...cancion });
    }

    sessionStorage.setItem('playlist', JSON.stringify(playlist));
    cargarPlaylist();
}

// Función para eliminar una canción de la playlist
function eliminarDePlaylist(index) {
    let playlist = JSON.parse(sessionStorage.getItem('playlist')) || [];
    playlist.splice(index, 1);
    sessionStorage.setItem('playlist', JSON.stringify(playlist));
    cargarPlaylist();
}

// Función para agregar una canción a las favoritas
function agregarAFavoritas(titulo, artista, color) {
    let favoritas = JSON.parse(localStorage.getItem('favoritas')) || [];
    const cancion = { titulo, artista, color };

    favoritas.push({ ...cancion }); 
    localStorage.setItem('favoritas', JSON.stringify(favoritas));
    cargarFavoritas();
}

// Función para eliminar una canción de favoritas
function eliminarDeFavoritas(index) {
    let favoritas = JSON.parse(localStorage.getItem('favoritas')) || [];
    favoritas.splice(index, 1);
    localStorage.setItem('favoritas', JSON.stringify(favoritas));
    cargarFavoritas();
}

// Renderiza la playlist desde sessionStorage
function cargarPlaylist() {
    const playlistDiv = document.getElementById('playlist');
    playlistDiv.innerHTML = '<h2>Playlist</h2>'; 

    const playlist = JSON.parse(sessionStorage.getItem('playlist')) || [];
    
    playlist.forEach((cancion, index) => {
        const cancionDiv = document.createElement('div');
        cancionDiv.classList.add('cancion');
        cancionDiv.style.backgroundColor = cancion.color; 
        cancionDiv.innerHTML = `
            <h3>${cancion.titulo}</h3>
            <p>${cancion.artista}</p>
            <button onclick="eliminarDePlaylist(${index})">Eliminar</button>
        `;
        playlistDiv.appendChild(cancionDiv);
    });
}

// Renderiza las canciones favoritas desde localStorage
function cargarFavoritas() {
    const favoritasDiv = document.getElementById('favoritas');
    favoritasDiv.innerHTML = '<h2>Favoritas</h2>';

    const favoritas = JSON.parse(localStorage.getItem('favoritas')) || [];
    
    favoritas.forEach((cancion, index) => {
        const cancionDiv = document.createElement('div');
        cancionDiv.classList.add('cancion');
        cancionDiv.style.backgroundColor = cancion.color; 
        cancionDiv.innerHTML = `
            <h3>${cancion.titulo}</h3>
            <p>${cancion.artista}</p>
            <button onclick="eliminarDeFavoritas(${index})">Eliminar</button>
        `;
        favoritasDiv.appendChild(cancionDiv);
    });
}
