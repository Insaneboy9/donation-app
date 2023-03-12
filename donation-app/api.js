import axios from "axios";

const BASE_URL = "http://10.0.2.2:8080";

export const callApi = {
  hawker: () =>
    fetch(`${BASE_URL}/hawkers`).then((response) => {
      return response.json();
    }),
  organization: () =>
    fetch(`${BASE_URL}/organizations`).then((response) => {
      return response.json();
    }),
  rewards: () =>
    fetch(`${BASE_URL}/rewards`).then((response) => {
      return response.json();
    }),
  history: async (data) => {
    try {
      const response = await axios.get(`${BASE_URL}/history/${data}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  onTransaction: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/transactions`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};
