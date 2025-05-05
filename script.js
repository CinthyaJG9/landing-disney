const grid = document.getElementById('characters-grid');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');

let currentPage = 1;
let searchTerm = '';

async function fetchCharacters(page = 1, name = '') {
  try {
    const url = name
      ? `https://api.disneyapi.dev/character?name=${name}&page=${page}&pageSize=12`
      : `https://api.disneyapi.dev/character?page=${page}&pageSize=12`;

    const res = await fetch(url);
    const data = await res.json();

    renderCharacters(data.data);
    currentPageSpan.textContent = page;
  } catch (err) {
    console.error('Error al obtener personajes:', err);
    grid.innerHTML = `<p>Error al cargar personajes.</p>`;
  }
}

function renderCharacters(characters) {
  grid.innerHTML = '';

  if (characters.length === 0) {
    grid.innerHTML = '<p>No se encontraron personajes.</p>';
    return;
  }

  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${character.imageUrl}" alt="${character.name}" />
      <div class="info">
        <h2>${character.name}</h2>
        <p>${character.films?.join(', ') || 'Sin películas registradas'}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value.trim();
  currentPage = 1;
  fetchCharacters(currentPage, searchTerm);
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage, searchTerm);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage, searchTerm);
});

// Cargar al inicio
fetchCharacters();
