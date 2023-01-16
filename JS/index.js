//API Calls
const keyApi = "c624b2747ef82f12d5c8d159fd9ba6cf";
const apiCountryApi = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

//Element Selection
const cityInput = document.querySelector("#city_input");
const searchBtn = document.querySelector("#search");
const cityName = document.querySelector("#city");
const temperature = document.querySelector("#temperature span");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weather_icon");
const countryIcon = document.querySelector("#country");
const humidity = document.querySelector("#humidity span");
const wind = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather_data");
const error = document.querySelector("#error_message");
const loader = document.querySelector("#loader");
const suggestions = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

//Functions
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyApi}&lang=pt_br`;

  const res = await fetch(apiWeatherUrl);
  const data = await res.json();

  toggleLoader();

  return data;
};

const showErrorMessage = () => {
  error.classList.remove("hide");
};

const hideInfo = () => {
  error.classList.add("hide");
  weatherContainer.classList.add("hide");
  suggestions.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInfo();
  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
  }

  cityName.innerText = data.name;
  temperature.innerText = parseInt(data.main.temp);
  description.innerText = data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryIcon.setAttribute("src", apiCountryApi + data.sys.country);
  humidity.innerText = `${data.main.humidity}%`;
  wind.innerText = `${data.wind.speed}km/h`;

  //Change BG image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
};

//Events
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});

suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});
