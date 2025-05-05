// Variables llamada al DOM
const movieContainer = document.getElementById("movies");
const notificationElement = document.getElementById("notification");

// Objeto vacío, el cual sirve para almacenar y tener acceso de cada tarjeta de pelicula
const elementsById = {};

// Uso de Local Storage para mantener pelculas favoritas y ocultas en la navegacion de paginas 
const savedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
const savedHidden = JSON.parse(localStorage.getItem('hiddenMovies')) || [];

// Uso de set para evitar duplicados
const favorites = new Set(savedFavorites);
const hiddenMovies = new Set(savedHidden);

// Guardar el estado en el Local Storage
function saveFavorites() {
  localStorage.setItem('favoriteMovies', JSON.stringify([...favorites]));
}

function saveHiddenMovies() {
  localStorage.setItem('hiddenMovies', JSON.stringify([...hiddenMovies]));
}

// Funcion de creacion de tarjeta HTML para cada película
function createCard(movie) {
  const div = document.createElement("div");
  div.className = "movie";
  div.innerHTML = `
    <img src="${movie.image}" alt="${movie.name}">
    <strong>${movie.name}</strong><br>
    <p>${movie.description}</p>
    <div class="actions">
      <a href="${movie.infoPage}" class="btn" target="_blank">Ver / Más información</a>
      <button class="btnFavorite" onclick="toggleFavorite('${movie.name}')">Añadir a favoritos</button>
      <button class="btn btnHide" onclick="hideMovie('${movie.name}')">Ocultar película</button>
    </div>
  `;
  return div;
}

// Agrega la tarjeta al contenedor y la registra en elementsById
function showMovie(movie) {
  const card = createCard(movie);
  movieContainer.appendChild(card);
  elementsById[movie.name] = card;
}

// Renderiza todas las películas del catálogo
moviesCatalog.forEach(showMovie);

//Funciones de Interfaz
// Actualiza el botón de favoritos en la tarjeta de la película
function updateFavoriteButton(card, movieName) {
  const btn = card.querySelector('.btnFavorite');
  if (favorites.has(movieName)) {
    btn.textContent = 'Quitar de favoritos';
    btn.style.backgroundColor = 'orange';
    btn.classList.add('added');
  } else {
    btn.textContent = 'Añadir a favoritos';
    btn.style.backgroundColor = '';
    btn.classList.remove('added');
  }
}

// Muestra una notificación temporal
function showNotification(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-temporal';
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);
  
    setTimeout(() => {
      mensajeDiv.remove();
    }, 2000);
  }

// funcion añadir y quitar de favoritos
function toggleFavorite(movieName) {
  const card = elementsById[movieName];
  const actionsDiv = card.querySelector('.actions');
  const hideBtn = card.querySelector('.btnHide');

  if (favorites.has(movieName)) {
    favorites.delete(movieName);
// Si se quita de favoritos, se restaura el botón de ocultar si no existe
    if (!hideBtn) {
      const newHideBtn = document.createElement('button');
      newHideBtn.className = 'btn btnHide';
      newHideBtn.textContent = 'Ocultar película';
      newHideBtn.onclick = () => hideMovie(movieName);
      actionsDiv.appendChild(newHideBtn);
    }
  } else {
    favorites.add(movieName);
// Al agregar a favoritos, se elimina el botón de ocultar si existe
    if (hideBtn) {
      hideBtn.remove();
    }
  }

  saveFavorites();
  updateFavoriteButton(card, movieName);
}

// funcion Confirmar con el usuario ocultar pelicula
function hideMovie(movieName) {
  if (confirm('¿Quieres ocultar la película?\nYa no te la mostraremos esta pelicula y tomaremos en cuenta tus opiniones para futuras recomendaciones.')) {
    const card = elementsById[movieName];
    if (card) {
      card.style.display = 'none';
// checkAllHidden();
      hiddenMovies.add(movieName);
      saveHiddenMovies();
      showNotification(`La película "${movieName}" ha sido ocultada`);
    }
  }
}

// Restaura las películas ocultas, mostrando nuevamente sus tarjetas
function restoreHiddenMovies() {
  hiddenMovies.forEach(movieName => {
    const card = elementsById[movieName];
    if (card) {
      card.style.display = 'block';
    }
  });
  hiddenMovies.clear();
  saveHiddenMovies();
}

// Muestra solo las películas que han sido marcadas como favoritas
function showFavorites() {
  for (const movieName in elementsById) {
    const card = elementsById[movieName];
    card.style.display = favorites.has(movieName) ? 'block' : 'none';
  }
}

// Muestra todas las películas que no estén marcadas como ocultas
function showAll() {
  for (const movieName in elementsById) {
    const card = elementsById[movieName];
    card.style.display = hiddenMovies.has(movieName) ? 'none' : 'block';
  }
}

// Restaura el estado de los favoritos
savedFavorites.forEach(movieName => {
  const card = elementsById[movieName];
  if (card) {
    updateFavoriteButton(card, movieName);
    const hideBtn = card.querySelector('.btnHide');
    if (hideBtn) {
      hideBtn.remove();
    }
  }
});

// Restaura el estado de las películas ocultas
savedHidden.forEach(movieName => {
  const card = elementsById[movieName];
  if (card) {
    card.style.display = 'none';
  }
});
