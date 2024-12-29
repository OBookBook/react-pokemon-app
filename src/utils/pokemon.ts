export const getAllPokemon = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
