const getGames = async () => {
  const uri =
    import.meta.env.VITE_RAWG_URI +
    "/games?key=" +
    import.meta.env.VITE_RAWG_APIKEY;
  try {
    const res = await fetch(uri, {
      method: "GET",
    });
    const responseData = await res.json();
    if (!res.ok) {
      throw new Error("Failed to get games.");
    }
    return responseData;
  } catch (err) {
    return err;
  }
};
