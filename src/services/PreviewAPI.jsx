export const fetchPreviewData = async (url) => {
  const API_KEY = import.meta.env.VITE_PREVIEW_API_KEY

  try {
    const response = await fetch(
      `https://api.linkpreview.net/?key=${API_KEY}&q=${url}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
};
