import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const fetchPokemonData = async () => {
    const res = await getAllPokemon(initialURL);
    loadPokemon(res.results);
    setLoading(false);
  };
  const loadPokemon = async (data: Pokemon[]): Promise<void> => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    SetPokemonData(_pokemonData);
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, SetPokemonData] = useState<any[]>([]);
  console.log(pokemonData);
  useEffect(() => {
    fetchPokemonData();
  }, []);

  return <>{loading ? <h1>Loading</h1> : <h1>Get Pokemon Datas</h1>}</>;
}

export default App;
