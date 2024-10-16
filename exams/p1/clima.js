import { Pronostico } from "./pronostico.js"

export class Clima {
    constructor(city, temperature, wind, description, forecast) {
        this.city = city.toLowerCase()
        this.temperature = temperature
        this.wind = wind
        this.description = description
        this.forecast = forecast
    }

    toJsonString = () => JSON.stringify(this)

    static createFromJsonString = (json) => {
        const { city, temperature, wind, description, forecast } = JSON.parse(json)
        return new Clima(city, temperature, wind, description, forecast)
    }

    static guardar = (clima) => {
        const LOCAL_STORAGE_KEY = 'savedWeathers'
        let storedWeathers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []

        if (!storedWeathers.find(data => data.city == clima.city)) {
            storedWeathers.push(clima)
        }

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedWeathers))
    }

    createHtmlElement = () => {
        const { city, temperature, wind, description, forecast } = this
        return `
            <article data-weather="${city}">
                <img src="./images/${description.toLowerCase() == 'sunny' ? 'sunny.png' : 'cloudy.png'}"
                <h3>${city}</h3>
                <p>temperature: ${temperature}</p>
                <p>wind: ${wind}</p>
                <p>description: ${description}</p>
                <p>
                    forecast: ${forecast.map(f => new Pronostico(f.day, f.temperature, f.wind).createHtmlElement()).join('')}
                </p>
                <!-- FIXME: el this.toJsonString() hacerlo de una forma mejor -->
                <button data-weather-save="${city}" data-wheater-json='${this.toJsonString()}'>Save</button>
            </article>
        `
    }
}