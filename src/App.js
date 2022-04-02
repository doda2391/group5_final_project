import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/weather.component";
import Form from "./components/form.component";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import React from "react";
import ShoeCard from "./components/ShoeCard.component";
import Stack from "@mui/material/Stack";
import ShowPicsList from "./components/ShowPicsList.component";
import SwitchesGroup from "./components/SwitchesGroup.component";

//api call to api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key = "757728b7834ccb1702d58b8378203828";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "shoes-collections.p.rapidapi.com",
    "X-RapidAPI-Key": "9316a7f1d0msh33be3a2c117ef1cp14cb88jsn855aed988544",
  },
};


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: null,
      country: null,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: null,
      shoeInfo: [],
      LTH: true,
    };

    this.weatherIcon = {
      //creating an object of Icons
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case (rangeId = 800):
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  api_call2 = async () => {
    const api_call21 = await fetch(
      "https://shoes-collections.p.rapidapi.com/shoes",
      options
    );
    const response2 = await api_call21.json();
    return response2;
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();
      if (response.cod === 200) {
        let information = await this.api_call2();

        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          celsius: this.calCelsius(response.main.temp),
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false,
          shoeInfo: information,
        });
        this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      } else {
        this.setState({ error: true });
      }
    } else {
      this.setState({ error: true });
    }
  };

  changeOrderHandler = (state) => {
    this.setState({ LTH: state });
  };

  render() {
    return (
      <div className="App">
        <Stack spacing={10} alignItems="center">
          <Form loadweather={this.getWeather} error={this.state.error} />
          <SwitchesGroup OrderHandler={this.changeOrderHandler} />
          {this.state.error ? null : (
            <Weather
              city={this.state.city}
              country={this.state.country}
              temp_celsius={this.state.celsius}
              temp_max={this.state.temp_max}
              temp_min={this.state.temp_min}
              description={this.state.description}
              weatherIcon={this.state.icon}
              error={this.state.error}
            />
          )}
          <ShowPicsList
            Information={this.state.shoeInfo}
            error={this.state.error}
            LTH={this.state.LTH}
          />
        </Stack>
      </div>
    );
  }
}

export default App;
