import readlinePromises from "readline/promises";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.weatherapi.com/v1/current.json";

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
const url = `${BASE_URL}?key=${process.env.API_KEY}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found. Please check the city name.");
    }
    const weatherData = await response.json();
    console.log("\n ---------Weather Information---------");
    console.log(`State: ${weatherData.location.country}`);
    console.log(`State: ${weatherData.location.region}`);
    console.log(`City: ${weatherData.location.name}`);
    console.log(`Temprature: ${weatherData.current.temp_c}°C`);
    console.log(`Condition: ${weatherData.current.condition.text}`);
    console.log(`Humidity: ${weatherData.current.humidity}%`);
    console.log(`Wind Speed: ${weatherData.current.wind_kph}kph`);
    console.log('-----------------------------------------')
    const city = await rl.question(
        "Enter a city name to get its current weather: "
      );
      await getWeather(city);
  } catch (err) {
    console.error(err.message);
  }
};

const city = await rl.question(
  "Enter a city name to get its current weather: "
);
await getWeather(city);
rl.close;
