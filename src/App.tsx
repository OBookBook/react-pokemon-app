import "./App.css";
import Btn from "./components/Btn/Btn";
import Card from "./components/Card/Card";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { INITIAL_POKEMON_URL } from "./constants/api";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

type PokemonData = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  weight: number;
  height: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
};

function App() {
  const initialURL = INITIAL_POKEMON_URL;
  const [state, setState] = useState<{
    loading: boolean;
    pokemonData: PokemonData[];
    nextURL: string;
    prevURL: string;
  }>({
    loading: true,
    pokemonData: [],
    nextURL: "",
    prevURL: "",
  });

  const fetchPokemonData = async (url: string) => {
    try {
      const res = await getAllPokemon(url);
      const pokemonData = await Promise.all(
        res.results.map((pokemon: PokemonData) => getPokemon(pokemon.url))
      );
      setState({
        loading: false,
        pokemonData,
        nextURL: res.next,
        prevURL: res.previous,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchPokemonData(initialURL);
  }, []);

  const handlePageChange = (url: string) => {
    if (url) fetchPokemonData(url);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <Btn
          handlePrevPage={() => handlePageChange(state.prevURL)}
          handleNextPage={() => handlePageChange(state.nextURL)}
        />
        {state.loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="pokemonCardContainer">
            {state.pokemonData.map((pokemon, i) => (
              <Card key={i} pokemon={pokemon} />
            ))}
          </div>
        )}
        <Btn
          handlePrevPage={() => handlePageChange(state.prevURL)}
          handleNextPage={() => handlePageChange(state.nextURL)}
        />
      </div>
    </>
  );
}

export default App;
