// const canciones = [
//     { titulo: "Sunflower", artista: "Post Malone", color: "#142663" },
//     { titulo: "Shape of You", artista: "Ed Sheeran", color: "#207237" },
//     { titulo: "Blinding Lights", artista: "The Weeknd", color: "#735226" },
//     { titulo: "Levitating", artista: "Dua Lipa", color: "#114703" },
//     { titulo: "Dance Monkey", artista: "Tones and I", color: "#776416" },
//     { titulo: "Old Town Road", artista: "Lil Nas X", color: "#206622" },
//     { titulo: "Rockstar", artista: "DaBaby", color: "#235612" },
//     { titulo: "Watermelon Sugar", artista: "Harry Styles", color: "#435730" },
//     { titulo: "Senorita", artista: "Shawn Mendes", color: "#377753" },
//     { titulo: "Good 4 U", artista: "Olivia Rodrigo", color: "#666132" }
// ];

let currentAudio = null;

fetch("https://discoveryprovider.audius.co/v1/tracks/trending?app_name=ExampleApp")
    .then((resp) => resp.json())
    .then((data) => cargarCanciones(data.data));

document.addEventListener("DOMContentLoaded", () => {
    cargarPlaylist();
    cargarFavoritas();
});

// Función para cargar las canciones desde el array al HTML
function cargarCanciones(canciones) {
    const cancionesDiv = document.getElementById('canciones');
    cancionesDiv.innerHTML = '<h2>Canciones</h2>';

    canciones.forEach((cancion, index) => {
        const cancionDiv = document.createElement('div');
        cancionDiv.classList.add('cancion');
        cancionDiv.style.backgroundColor = cancion.color;
        cancionDiv.innerHTML = `
            <h3>${cancion.title}</h3>
            <p>${cancion.genre}</p>
            <button onclick="agregarAPlaylist('${cancion.title}', '${cancion.genre}', true, '${cancion.color}')">Agregar al inicio</button>
            <button onclick="agregarAPlaylist('${cancion.title}', '${cancion.genre}', false, '${cancion.color}')">Agregar al final</button>
            <button onclick="agregarAFavoritas('${cancion.title}', '${cancion.genre}', '${cancion.color}')">Agregar a favoritas</button>
            <button class="escuchar" onclick="playSong('${cancion.id}')">Play</button>
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

// Función para reproducir la canción
function playSong(trackId) {
    // Si ya hay un audio reproduciéndose, deténlo
    if (currentAudio) {
        currentAudio.pause(); // Detener la reproducción
        currentAudio.currentTime = 0; // Reiniciar a 0 si lo deseas
    }

    // Crea un nuevo audio para la nueva canción
    currentAudio = new Audio(`https://discoveryprovider.audius.co/v1/tracks/${trackId}/stream?app_name=ExampleApp`);
    
    // Reproduce la nueva canción
    currentAudio.play()
        .then(() => {
            console.log('Reproduciendo canción...');
        })
        .catch((error) => {
            console.error('Error al reproducir la canción:', error);
        });
}