import './style.css';

import assert from '@/shared/assert.js';

let container;
let temperatureElement;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather']");
    assert.elements({ container });

    temperatureElement = container.querySelector("[data-role='temperature']");
    assert.elements({ temperatureElement });
}

function render(temperature, useFahrenheit) {
    renderTemperature(temperature, useFahrenheit);
}

function renderTemperature(temperature, useFahrenheit) {
    const unit = '°' + (useFahrenheit ? 'F' : 'C');
    temperature = Math.round(temperature);
    temperatureElement.textContent = temperature + unit;
}

const weatherComponent = {
    init,
    render,
};

export default weatherComponent;
