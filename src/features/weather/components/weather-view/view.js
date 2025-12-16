import '@/shared/styles/utilities.css';
import './style.css';

import assert from '@/shared/utils/assert.js';

let container;

let resultsContainer;
let iconElement;
let locationElement;
let temperatureElement;

let errorContainer;
let errorMessageElement;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather-view']");
    assert.elements({ container });

    resultsContainer = container.querySelector("[data-role='results']");
    locationElement = container.querySelector("[data-role='location']");
    temperatureElement = container.querySelector("[data-role='temperature']");
    iconElement = container.querySelector("[data-role='icon']");

    errorContainer = container.querySelector("[data-role='error']");
    errorMessageElement = container.querySelector(
        "[data-role='error-message']",
    );

    assert.elements({
        resultsContainer,
        locationElement,
        temperatureElement,
        iconElement,

        errorContainer,
        errorMessageElement,
    });
}

function render({ location, temperature, useFahrenheit, iconId }) {
    renderIcon({ iconId });
    renderLocation({ location });
    renderTemperature({ temperature, useFahrenheit });
    showResults();
}

async function renderIcon({ iconId }) {
    const { default: icon } = await import(`./icons/${iconId}.svg`);
    iconElement.src = icon;
}

function renderLocation({ location }) {
    locationElement.textContent = location;
}

function renderTemperature({ temperature, useFahrenheit }) {
    const unit = '°' + (useFahrenheit ? 'F' : 'C');
    temperature = Math.round(temperature);
    temperatureElement.textContent = temperature + unit;
}

function renderErrorMessage(message) {
    showError();
}

function showResults() {
    errorContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
}

function showError() {
    resultsContainer.classList.add('hidden');
    errorContainer.classList.remove('hidden');
}

const weatherComponent = {
    init,
    render,
    renderTemperature,
    renderErrorMessage,
};

export default weatherComponent;
