let container;
let locationInput;
let getWeatherButton;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("form[name='weather-request']");
    locationInput = container.querySelector("[data-input='location']");
    getWeatherButton = container.querySelector("[data-action='get-weather']");
}

const weatherRequestForm = {
    init,
};

export default weatherRequestForm;
