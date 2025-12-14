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

function render(weatherData) {
    renderTemperature(weatherData.currentConditions.temp);
}

function renderTemperature(temperature) {
    temperatureElement.textContent = temperature + '°';
}

const weatherView = {
    init,
    render,
};

export default weatherView;
