import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const fetchPokemonData = async () => {
    const res = await getAllPokemon(initialURL);
    loadPokemon(res.results);
    setNextURL(res.next);
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
  const [nextURL, setNextURL] = useState<string>("");

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const handleNextPage = async () => {
    setLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setLoading(false);
  };

  const handlePrevPage = () => {};

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>Prev</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
