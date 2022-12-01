import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
  },
  params: {
    api_key: "de2bfb1bfc5a2181847adccbf5f1218c",
  },
});
