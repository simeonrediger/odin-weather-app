import './styles/weather-view.css';

let container;
let temperatureElement;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather-view']");
    temperatureElement = container.querySelector("[data-role='temperature']");
}

function render(weatherData, useFahrenheit) {
    renderTemperature(weatherData.currentConditions.temp, useFahrenheit);
}

function renderTemperature(temperature, useFahrenheit = false) {
    let unit = '°';

    if (useFahrenheit) {
        unit += 'F';
    } else {
        temperature = (temperature - 32) * (5 / 9);
        unit += 'C';
    }

    temperature = Math.round(temperature);
    temperatureElement.textContent = temperature + unit;
}

const weatherView = {
    init,
    render,
};

export default weatherView;
