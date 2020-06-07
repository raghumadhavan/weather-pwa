import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "80e865850fd2cfff454d2f0a30c1201c";

export const fetchWeather = async query => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY
    }
  });
  return data;
};