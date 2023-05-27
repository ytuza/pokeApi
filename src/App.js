import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
      setPokemon(null);
    }
  };

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="container">
      <h1 className="text-center mt-5">Buscador PokeAPI</h1>
      <div className="input-group mb-3 search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el Nombre del Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {pokemon ? (
        <div className="pokemon-details">
          <h2 className="text-center">{capitalize(pokemon.name)}</h2>
          <div className="text-center" >
            <img class="pokemon-img" src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <h3 className="text-center">Altura: {pokemon.height}</h3>
          <h3 className="text-center">Peso: {pokemon.weight}</h3>
          <h3 className="text-center">Habilidades:</h3>
          <hr />
          <h4 >
            <ul>
              {pokemon.abilities.map(({ability}, index) => (
                <li key={index}>
                  {capitalize(ability.name)}
                </li>
              ))}
            </ul>
          </h4>
        </div>
      ) : (
        <p className="text-center">Pokemon no encontrado</p>
      )}
    </div>
  );
}

export default App;