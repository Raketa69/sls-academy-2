import axios from 'axios';

class WeatherController {

    static appid = "64eb7f71512192e5ac6303e3c2537ecf"
    static city = "Odesa"
    static units = 'metric'

    async getWeather() {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.appid}&units=${this.units}`);

            let currentWeather = {
                main: response.data.weather[0].main,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                temp: response.data.main.temp,
                feels_like: response.data.main.feels_like,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                humidity: response.data.main.humidity,
                wind: response.data.wind.speed
            }

            return currentWeather;
        } catch (error) {
            console.error(error);
        }

    }

    async getForecast() {
        try {
            let data = []
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.appid}&units=${this.units}`)
            for (let i = 0; i <= 5; ++i) {
                data.push({
                    temp: response.data.list[i].main.temp,
                    feels_like: response.data.list[i].main.feels_like,
                    temp_min: response.data.list[i].main.temp_min,
                    temp_max: response.data.list[i].main.temp_max,
                    humidity: response.data.list[i].main.humidity,
                    date: response.data.list[i].dt_txt,
                    weather: response.data.list[i].weather[0].main
                })
            }

            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default WeatherController;