
import { useState } from 'react';

import Logo from './PokemonLogo';
import Results from './Results';
import Types from './Types'
import './App.css';

function App() {
  const [searchPokemon, setSearchPokemon] = useState('');
  const [generationsPokemon, setGenerationsPokemon] = useState([]);

  return (
    <div>
      <header className="controls">
        <Logo />
        <div className="search">
          <label htmlFor="search">Search</label>
          <input type="text" className='searchBox'
            placeholder="Search for a Pokemon"
            onChange={e => setSearchPokemon(e.target.value)}
            value={searchPokemon} />
          <label htmlFor="type">Generation</label>
          <Types onChange={e => setGenerationsPokemon(e)} />
        </div>
      </header>
      <main>
        <Results
          itemsPerPage={12}
          filterByName={searchPokemon}
          filterByGeneration={generationsPokemon} />
      </main>
    </div>
  );
}

export default App;
