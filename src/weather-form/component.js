import './style.css';

import assert from '@/shared/assert.js';

let container;
let locationInput;
let useFahrenheitInput;
let getWeatherButton;

const handlers = {
    onSubmit: undefined,
    onUseFahrenheitChange: undefined,
};

function init(root, { onSubmit, onUseFahrenheitChange }) {
    cacheElements(root);
    handlers.onSubmit = onSubmit;
    handlers.onUseFahrenheitChange = onUseFahrenheitChange;
    bindEvents();
}

function cacheElements(root) {
    container = root.querySelector("form[name='weather']");
    assert.elements({ container });

    locationInput = container.querySelector("[data-input='location']");
    useFahrenheitInput = container.querySelector(
        "[data-input='use-fahrenheit']",
    );
    getWeatherButton = container.querySelector("[data-action='get-weather']");
    assert.elements({ locationInput, useFahrenheitInput, getWeatherButton });
}

function bindEvents() {
    container.addEventListener('submit', handleSubmit);
    useFahrenheitInput.addEventListener('change', handleUseFahrenheitChange);
}

function handleSubmit(event) {
    event.preventDefault();
    const location = locationInput.value;
    const useFahrenheit = useFahrenheitInput.checked;
    const data = { location, useFahrenheit };
    handlers.onSubmit(data, useFahrenheit);
}

function handleUseFahrenheitChange() {
    const useFahrenheit = useFahrenheitInput.checked;
    handlers.onUseFahrenheitChange(useFahrenheit);
}

const weatherForm = {
    init,
};

export default weatherForm;
