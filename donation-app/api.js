const API_KEY = "844dc95d3ddc96f564cf9a2e16cd5545";
const BASE_URL = "https://api.themoviedb.org/3";

export const callApi = {
  hawker: () =>
    fetch(`http://10.0.2.2:8080/hawkers`).then((response) => {
      return response.json();
    }),
  community: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((response) =>
      response.json()
    ),
};
