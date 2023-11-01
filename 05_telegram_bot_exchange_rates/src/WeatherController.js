import axios from 'axios';

class WeatherController {

    appid = "64eb7f71512192e5ac6303e3c2537ecf"
    city = "Odesa"
    units = 'metric'

    async getWeather() {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.appid}&units=${this.units}`)
            const currentWeather = {
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
    async getForecast(hour) {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.appid}&units=${this.units}`)
            const data = {
                temp: response.data.list[hour].main.temp,
                feels_like: response.data.list[hour].main.feels_like,
                temp_min: response.data.list[hour].main.temp_min,
                temp_max: response.data.list[hour].main.temp_max,
                humidity: response.data.list[hour].main.humidity,
                date: response.data.list[hour].dt_txt,
                weather: response.data.list[hour].weather[0].main,
                wind: response.data.list[hour].wind.speed
            }
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
export default WeatherController;