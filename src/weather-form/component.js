import './style.css';

let container;
let locationInput;
let useFahrenheitInput;
let getWeatherButton;

const handlers = {
    onSubmit: undefined,
};

function init(root, onSubmit) {
    cacheElements(root);
    handlers.onSubmit = onSubmit;
    bindEvents();
}

function cacheElements(root) {
    container = root.querySelector("form[name='weather']");
    validateElements({ container });

    locationInput = container.querySelector("[data-input='location']");
    useFahrenheitInput = container.querySelector(
        "[data-input='use-fahrenheit']",
    );
    getWeatherButton = container.querySelector("[data-action='get-weather']");
    validateElements({ locationInput, useFahrenheitInput, getWeatherButton });
}

function bindEvents() {
    container.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    const location = locationInput.value;
    const useFahrenheit = useFahrenheitInput.checked;
    const data = { location, useFahrenheit };
    handlers.onSubmit(data);
}

function validateElements(elementsObject) {
    const missingElements = Object.entries(elementsObject)
        .filter(([name, element]) => !element)
        .map(([name, element]) => name);

    if (missingElements.length > 0) {
        throw new Error(`Element(s) not found: ${missingElements.join(', ')}`);
    }
}

const weatherForm = {
    init,
};

export default weatherForm;
