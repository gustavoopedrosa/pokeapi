import './App.css'

import { useEffect, useState } from 'react'

import logo from './logo.png'

function App() {
  const [inputValue, setInputValue] = useState('charizard')
  const [pokemon, setPokemon] = useState({
    image: '',
    name: 'Nome',
    type: 'Tipo'
  })

  function clearInput(){
    setInputValue('')
  }

  function loadPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
      .then(response => response.json())
      .then(responseJson => setPokemon({
        image: responseJson.sprites.front_default,
        name: responseJson.name,
        type: responseJson.types[0].type.name,
      }))
  }

  function handleChange(e) {
    setInputValue(e.target.value)
  }
  
  useEffect(() => {
    loadPokemon()
  }, [])

  return (
    <div className="container">
      <div className="logo_container">
        <img src={logo} />
      </div>
      <div className="input_container">
        <input
          value={inputValue}
          type="text"
          className="input_input"
          onChange={(event) => handleChange(event)
          }></input>
        <label className="input_label">Digite o nome de um Pokemon</label>
        <button className="input_cta" onClick={clearInput}>Apaga!</button>
        <button className="input_cta" onClick={loadPokemon}>Vai!</button>
      </div>
      <div className="pokemon_container">
        <div className="pokemon_image">
          <img src={pokemon.image} />
        </div>
        <div className="pokemon_info">
          <h1 className="pokemon_name">{pokemon.name}</h1>
          <h2 className="pokemon_type">{pokemon.type}</h2>
        </div>
      </div>
    </div>
  )
}

export default App;
