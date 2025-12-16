import './style.css';

import assert from '@/shared/utils/assert.js';

let container;
let locationInput;
let useFahrenheitInput;
let getWeatherButton;

const handlers = {
    onSubmit: undefined,
    onTemperatureUnitChange: undefined,
};

function init(root, { onSubmit, onTemperatureUnitChange, defaults }) {
    cacheElements(root);
    handlers.onSubmit = onSubmit;
    handlers.onTemperatureUnitChange = onTemperatureUnitChange;
    bindEvents();

    if (defaults) {
        applyDefaults(defaults);
        submit();
    }
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
    locationInput.addEventListener('input', removeLocationInputCustomValidity);
    useFahrenheitInput.addEventListener('change', handleTemperatureUnitChange);
}

function handleSubmit(event) {
    event.preventDefault();
    submit();
}

function handleTemperatureUnitChange() {
    const useFahrenheit = useFahrenheitInput.checked;
    handlers.onTemperatureUnitChange(useFahrenheit);
}

function submit() {
    const location = locationInput.value;
    const useFahrenheit = useFahrenheitInput.checked;

    handlers
        .onSubmit(location, useFahrenheit)
        .then(handleFulfilledSubmission)
        .catch(handleRejectedSubmission);
}

function handleFulfilledSubmission() {
    locationInput.setCustomValidity('');
}

function handleRejectedSubmission(error) {
    locationInput.setCustomValidity(error.message);
    locationInput.reportValidity();
}

function removeLocationInputCustomValidity() {
    locationInput.setCustomValidity('');
}

function applyDefaults({ location, useFahrenheit }) {
    if (location) {
        locationInput.value = location;
    }

    if (useFahrenheit !== undefined) {
        useFahrenheitInput.checked = useFahrenheit;
    }
}

const weatherForm = {
    init,
};

export default weatherForm;
