import './style.css';

import assert from '@/shared/assert.js';

let container;
let locationElement;
let temperatureElement;
let iconElement;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather']");
    assert.elements({ container });

    locationElement = container.querySelector("[data-role='location']");
    temperatureElement = container.querySelector("[data-role='temperature']");
    iconElement = container.querySelector("[data-role='icon']");
    assert.elements({ locationElement, temperatureElement, iconElement });
}

function render({ location, temperature, useFahrenheit, iconId }) {
    renderLocation({ location });
    renderTemperature({ temperature, useFahrenheit });
    renderIcon({ iconId });
}

function renderLocation({ location }) {
    locationElement.textContent = location;
}

function renderTemperature({ temperature, useFahrenheit }) {
    const unit = '°' + (useFahrenheit ? 'F' : 'C');
    temperature = Math.round(temperature);
    temperatureElement.textContent = temperature + unit;
}

async function renderIcon({ iconId }) {
    const { default: icon } = await import(`../icons/${iconId}.svg`);
    iconElement.src = icon;
}

const weatherComponent = {
    init,
    render,
    renderTemperature,
};

export default weatherComponent;
