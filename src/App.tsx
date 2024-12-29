import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";

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
  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </>
  );
}

export default App;
