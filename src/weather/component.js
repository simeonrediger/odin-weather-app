import './style.css';

import assert from '@/shared/assert.js';

let container;
let locationElement;
let temperatureElement;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather']");
    assert.elements({ container });

    locationElement = container.querySelector("[data-role='location']");
    temperatureElement = container.querySelector("[data-role='temperature']");
    assert.elements({ locationElement, temperatureElement });
}

function render({ location, temperature, useFahrenheit }) {
    renderLocation({ location });
    renderTemperature({ temperature, useFahrenheit });
}

function renderLocation({ location }) {
    locationElement.textContent = location;
}

function renderTemperature({ temperature, useFahrenheit }) {
    const unit = '°' + (useFahrenheit ? 'F' : 'C');
    temperature = Math.round(temperature);
    temperatureElement.textContent = temperature + unit;
}

const weatherComponent = {
    init,
    render,
    renderTemperature,
};

export default weatherComponent;
