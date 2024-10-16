import { Clima } from "./clima.js"

class WeatherService {
    static async fetchCity(city) {
        try {
            const fromStorage = JSON.parse(localStorage.getItem('weather_' + city))

            if (fromStorage) {
                console.log(`[debug] Returning weather from storage`, fromStorage)
                return fromStorage
            }

            console.log(`[debug] Fetching weather city: ${city}`)
            const response = await fetch(`https://weather-api-progra-3.vercel.app/weather/${city}`)
            const data = await response.json()

            localStorage.setItem('weather_' + city, JSON.stringify(data))
            console.log(`[debug] Returning weather from api`, data)

            return data
        } catch (error) {
            console.error(`[debug] Error fetching weather at page ${city}`)
        }
    }
}

class WeatherManager {
    //static getWeatherElementContainer = () => document.getElementById('clima')
    static getSearchButtonElement = () => document.getElementById('buscar')
    static getSearchInputElement = () => document.getElementById('traer-ciudad')
    //static getSearchContainerElement = () => document.getElementById('busqueda')

    static loadCity = async (ciudad = 'avellaneda', targetElementId = 'clima') => {
        const container = document.getElementById(targetElementId)
        container.innerHTML = ''

        const weather = await WeatherService.fetchCity(ciudad.toLowerCase())
        const { city, temperature, wind, description, forecast } = weather

        container.innerHTML += new Clima(city, temperature, wind, description, forecast).createHtmlElement()

        document.querySelector(`[data-weather-save="${ciudad}"]`).addEventListener('click', (event) => {
            // FIXME: No sacarlo de un data-attr
            const jsonString = event.target.getAttribute('data-wheater-json')
            Clima.guardar(Clima.createFromJsonString(jsonString))
        })
    }

    static traerCiudad = async () => {
        const city = this.getSearchInputElement().value
        await this.loadCity(city, 'busqueda')
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[debug] Content loaded')
    await WeatherManager.loadCity()
    WeatherManager.getSearchButtonElement().addEventListener('click', WeatherManager.traerCiudad)
})
