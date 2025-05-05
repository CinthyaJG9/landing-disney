const grid = document.getElementById('characters-grid');

async function fetchCharacters() {
  try {
    const response = await fetch('https://api.disneyapi.dev/character?page=1&pageSize=12');
    const data = await response.json();
    const characters = data.data;

    characters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${character.imageUrl}" alt="${character.name}" />
        <div class="info">
          <h2>${character.name}</h2>
          <p>${character.films.length > 0 ? character.films.join(', ') : 'Sin películas registradas'}</p>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    grid.innerHTML = '<p>Ocurrió un error al cargar los personajes.</p>';
  }
}

fetchCharacters();
