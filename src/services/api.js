import axios from "axios";

axios.defaults.baseURL = "https://secret-santa-1.bogdanlyopa.repl.co/api";

// axios.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request.url, null, 2));
//   return request;
// });

// axios.interceptors.response.use((response) => {
//   console.log("Response:", JSON.stringify(response.data, null, 2));
//   return response;
// });

export const api = {
  async registration(email, name, password) {
    const user = {
      email,
      name,
      password,
    };

    const { data } = await axios.post("/registration", user);

    return data;
  },

  async login(email, password) {
    const credentials = {
      email,
      password,
    };
    const { data } = await axios.post("/login", credentials);

    return data;
  },

  async setWishes(wish) {
    const { data } = await axios.patch(
      "/wish",
      { wish },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return data;
  },

  async getRandomUser() {
    const { data } = await axios.patch(
      "/santaFor",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return data;
  },

  async getMyUser() {
    const { data } = await axios.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  },

  async getLuckyWish() {
    const { data } = await axios.get("/wish", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  },

  async getUsersCount() {
    const { data } = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  },
};
