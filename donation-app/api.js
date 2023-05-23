import axios from "axios";

// const BASE_URL = "http://10.0.2.2:8080";
const BASE_URL = "http://10.0.2.2:5001/donation-app-8de49/us-central1/app";
// const BASE_URL = "https://app-62ks7ifztq-uc.a.run.app";

// api calls to backend
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
    } catch (error) {
      console.log(error);
    }
  },
  leaderboard: () =>
    fetch(`${BASE_URL}/leaderboard`).then((response) => {
      return response.json();
    }),
  challenge: () =>
    fetch(`${BASE_URL}/challenge`).then((response) => {
      return response.json();
    }),
};
