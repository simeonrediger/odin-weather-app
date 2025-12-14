import './styles/weather-request-form.css';

let container;
let locationInput;
let getWeatherButton;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("form[name='weather-request']");
    validateElements({ container });

    locationInput = container.querySelector("[data-input='location']");
    getWeatherButton = container.querySelector("[data-action='get-weather']");
    validateElements({ locationInput, getWeatherButton });
}

function validateElements(elementsObject) {
    const missingElements = Object.entries(elementsObject)
        .filter(([name, element]) => !element)
        .map(([name, element]) => name);

    if (missingElements.length > 0) {
        throw new Error(`Element(s) not found: ${missingElements.join(', ')}`);
    }
}

const weatherRequestForm = {
    init,
};

export default weatherRequestForm;
