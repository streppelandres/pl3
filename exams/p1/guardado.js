import { Clima } from "./clima.js"


class StoredWeathersManager {
    static load = () => {
        const LOCAL_STORAGE_KEY = 'savedWeathers'
        const storedWeathers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

        const container = document.getElementById('climas-guardados')
        container.innerHTML = ''
        container.innerHTML += storedWeathers.map(w => {
            const c = new Clima(w.city, w.temperature, w.wind, w.description, w.forecast)
            return c.createHtmlElement()
        })
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('[debug] Content loaded')
    StoredWeathersManager.load()

    document.querySelectorAll('[data-sort]').forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(event.target)
            //StoredWeathersManager.load()
        })
    })
})