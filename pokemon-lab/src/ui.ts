import { PokemonResponse } from './pokemon';

export function renderPokemon(pokemon: PokemonResponse): void {
  const resultDiv = document.getElementById('result')!;
  resultDiv.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p>ID: ${pokemon.id}</p>
    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    <div>
      ${Object.entries(pokemon.sprites)
        .filter(([key, value]) => typeof value === "string" && value !== null && key.includes('front'))
        .map(([key, value]) => `<img src="${value}" alt="${pokemon.name}" title="${key}" />`)
        .join('')}
    </div>
  `;
}

export function renderHistory(history: string[]): void {
  const historyUl = document.getElementById('history')!;
  historyUl.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', () => {
      const input = document.getElementById('searchInput') as HTMLInputElement;
      input.value = item;
      const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
      searchBtn.click();
    });
    historyUl.appendChild(li);
  });
}
