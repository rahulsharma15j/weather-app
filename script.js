const error = document.getElementById("error");
const feelsLike = document.getElementById("feels-like");
const humidityValue = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const locatedCountry = document.querySelector(".country");
const input = document.getElementById("input");
const btn = document.getElementById("btn");

//api access key
const APIKey = "f306541d3a233aa17a10002cfdf3742c";

const onError = (text) => {
  error.innerText = text;
  error.classList.add("active");
};

const onSuccess = () => {
  error.innerText = "";
  error.classList.remove("active");
};

//calling weather api
const apiRequest = async (city) => {
  try {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    //getting api response
    let response = await fetch(API);

    if (response && response.status === 404) {
      onError("Please enter valid city name!");
      return;
    } else {
      let result = await response.json();
      getWeatherDetails(result);
      onSuccess();
    }
  } catch (error) {
    onError("Something went wrong!");
  }
};

const getWeatherDetails = (weatherDetails) => {
  const { name } = weatherDetails;
  const { country } = weatherDetails.sys;
  const { temp, feels_like, humidity } = weatherDetails.main;
  const { description, id } = weatherDetails.weather[0];
  const { speed } = weatherDetails.wind;

  temperature.innerText = `${Math.floor(temp)}°C`;
  feelsLike.innerText = `Feels Like ${Math.floor(feels_like)}°C`;
  desc.innerText = description;
  locatedCountry.innerText = `${name}, ${country}`;
  humidityValue.innerText = `${humidity}%`;
  windSpeed.innerText = `${speed} Km/hr`;

  //showing weather icons according to id
  if (id >= 200 && id <= 232) weatherIcon.src = "./icons/thunder.svg";
  else if (id >= 300 && id <= 321) weatherIcon.src = "./icons/rainy-2.svg";
  else if (id >= 500 && id <= 531) weatherIcon.src = "./icons/rainy-1.svg";
  else if (id >= 600 && id <= 622) weatherIcon.src = "./icons/snowy.svg";
  else if (id >= 701 && id <= 781) weatherIcon.src = "./icons/cloudy-day-1.svg";
  else if (id === 800) weatherIcon.src = "./icons/day.svg";
  else if (id >= 801 && id <= 804) weatherIcon.src = "./icons/cloudy-day-3.svg";
};

btn.addEventListener("click", (e) => {
  if (input.value !== "") {
    apiRequest(input.value);
  } else {
    onError("Please enter city name!");
    return;
  }
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && input.value !== "") apiRequest(input.value);
  else if (e.key === "Enter" && input.value === "") {
    onError("Please enter city name!");
    return;
  }
});

apiRequest("delhi");
