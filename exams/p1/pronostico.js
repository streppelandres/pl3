export class Pronostico {
    constructor(day, temperature, wind) {
        this.day = day
        this.temperature = temperature
        this.wind = wind
    }

    createHtmlElement = () => {
        const { day, temperature, wind } = this
        return `
            <div>
                <p>day: ${day}</p>
                <p>temperature: ${temperature}</p>
                <p>wind: ${wind}</p>
            </div>
        `
    }
}