import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';
import '@/shared/styles/layout.css';

import weatherComponent from './weather/component.js';
import weatherFormComponent from './weather-form/component.js';
import weatherService from './services/weather.js';
import weatherState from './state/weather.js';

weatherComponent.init(document);
weatherFormComponent.init(document, {
    onSubmit: handleWeatherFormSubmit,
    onUseFahrenheitChange: handleUseFahrenheitChange,
});

async function handleWeatherFormSubmit(data, useFahrenheit) {
    const weatherData = await weatherService.getData(data.location);
    weatherState.location = weatherData.resolvedAddress;
    weatherState.useFahrenheit = useFahrenheit;
    weatherState.temperature = weatherData.currentConditions.temp;
    weatherComponent.render(
        weatherState.temperature,
        weatherState.useFahrenheit,
    );
}

function handleUseFahrenheitChange(useFahrenheit) {
    weatherState.useFahrenheit = useFahrenheit;
    weatherComponent.renderTemperature(
        weatherState.temperature,
        weatherState.useFahrenheit,
    );
}
