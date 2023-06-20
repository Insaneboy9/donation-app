import axios from "axios";

const BASE_URL = "http://10.0.2.2:8080"; //local host docker version
// const BASE_URL = "http://10.0.2.2:5001/donation-app-8de49/us-central1/app"; //local host version
// const BASE_URL = "https://app-62ks7ifztq-uc.a.run.app"; //faas version
// const BASE_URL = "http://34.172.209.193:8080"; //GKE version

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
  challenges: async (data) => {
    try {
      const response = await axios.get(`${BASE_URL}/challenges/${data}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
