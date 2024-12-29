import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  const fetchPokemonData = async () => {
    const res = await getAllPokemon(initialURL);
    console.log(res);
  };

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchPokemonData();
    setLoading(false);
  }, []);

  return <>{loading ? <h1>Loading</h1> : <h1>Get Pokemon Datas</h1>}</>;
}

export default App;
