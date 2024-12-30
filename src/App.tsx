import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import Btn from "./components/Btn/Btn";

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
    setPrevURL(res.prev);
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
  const [prevURL, setPrevURL] = useState<string>("");

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const handleNextPage = async () => {
    setLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    const data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <Btn handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <Btn
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
