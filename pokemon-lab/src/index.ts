import { fetchPokemon } from './pokemon';
import { renderPokemon, renderHistory } from './ui';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')!;

let currentPokemonId: number | null = null;
let history: string[] = JSON.parse(localStorage.getItem('history') || '[]');

renderHistory(history);

async function searchPokemon(query: string | number) {
  if (!query) return;

  resultDiv.innerHTML = "🔄 Buscando...";
  try {
    const pokemon = await fetchPokemon(query);
    currentPokemonId = pokemon.id;
    renderPokemon(pokemon);
    updateHistory(pokemon.name);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
}

function updateHistory(name: string) {
  if (!history.includes(name)) {
    history.unshift(name);
    if (history.length > 10) history.pop(); // Máximo 10
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory(history);
  }
}

button.addEventListener('click', () => searchPokemon(input.value.trim()));

prevBtn.addEventListener('click', () => {
  if (currentPokemonId && currentPokemonId > 1) searchPokemon(currentPokemonId - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPokemonId) searchPokemon(currentPokemonId + 1);
});

// Permitir Enter para buscar
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') button.click();
});
