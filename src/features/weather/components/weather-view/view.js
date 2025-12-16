import '@/shared/styles/loading-indicator.css';
import '@/shared/styles/utilities.css';
import './style.css';

import assert from '@/shared/utils/assert.js';

let container;

let results;
let weatherIcon;
let locationElement;
let temperatureElement;

let loadingIndicator;

let errorContainer;
let errorMessageElement;
let errorIcon;

let currentWeatherClass;

function init(root) {
    cacheElements(root);
    renderErrorIcon();
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather-view']");
    assert.elements({ container });

    results = container.querySelector("[data-role='results']");
    locationElement = container.querySelector("[data-role='location']");
    temperatureElement = container.querySelector("[data-role='temperature']");
    weatherIcon = container.querySelector("[data-role='icon']");

    loadingIndicator = container.querySelector(
        "[data-role='loading-indicator']",
    );

    errorContainer = container.querySelector("[data-role='error']");
    errorIcon = container.querySelector("[data-role='error-icon']");
    errorMessageElement = container.querySelector(
        "[data-role='error-message']",
    );

    assert.elements({
        results,
        locationElement,
        temperatureElement,
        weatherIcon,

        loadingIndicator,

        errorContainer,
        errorIcon,
        errorMessageElement,
    });
}

function render({ location, temperature, useFahrenheit, iconId }) {
    renderWeatherIcon({ iconId });
    renderLocation({ location });
    renderTemperature({ temperature, useFahrenheit });
    renderBackground({ weatherClass: iconId });
    showResults();
}

async function renderWeatherIcon({ iconId }) {
    const { default: icon } = await import(`./icons/${iconId}.svg`);
    weatherIcon.src = icon;
}

function renderLocation({ location }) {
    locationElement.textContent = location;
}

function renderTemperature({ temperature, useFahrenheit }) {
    const unit = '°' + (useFahrenheit ? 'F' : 'C');
    temperature = Math.round(temperature);
    temperatureElement.textContent = temperature + unit;
}

function renderBackground({ weatherClass } = {}) {
    if (weatherClass === currentWeatherClass) {
        return;
    }

    container.classList.add(weatherClass);
    container.classList.remove(currentWeatherClass);
    currentWeatherClass = weatherClass;
}

async function renderErrorIcon() {
    const { default: icon } = await import(`./icons/error.svg`);
    errorIcon.src = icon;
}

function renderError(message) {
    errorMessageElement.textContent = message;
    renderBackground();
    showError();
}

function showResults() {
    errorContainer.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
    results.classList.remove('hidden');
}

function showLoadingIndicator() {
    renderBackground();
    results.classList.add('hidden');
    errorContainer.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
}

function showError() {
    results.classList.add('hidden');
    loadingIndicator.classList.add('hidden');
    errorContainer.classList.remove('hidden');
}

const weatherComponent = {
    init,
    showLoadingIndicator,
    render,
    renderTemperature,
    renderError,
};

export default weatherComponent;
