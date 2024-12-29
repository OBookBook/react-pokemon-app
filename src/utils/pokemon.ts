export const getAllPokemon = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(`Failed to fetch data: ${message}`);
  }
};

export const getPokemon = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
