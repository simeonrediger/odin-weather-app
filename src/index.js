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
    onTemperatureUnitChange: handleTemperatureUnitChange,
});

async function handleWeatherFormSubmit(data, useFahrenheit) {
    const weatherData = await weatherService.getData(data.location);

    weatherState.update({
        useFahrenheit,
        location: weatherData.resolvedAddress,
        temperature: weatherData.currentConditions.temp,
        iconId: weatherData.currentConditions.icon,
    });

    weatherComponent.render({
        location: weatherState.location,
        temperature: weatherState.temperature,
        useFahrenheit: weatherState.useFahrenheit,
        iconId: weatherState.iconId,
    });
}

function handleTemperatureUnitChange(useFahrenheit) {
    weatherState.update({ useFahrenheit });

    if (weatherState.isComplete) {
        weatherComponent.renderTemperature({
            temperature: weatherState.temperature,
            useFahrenheit: weatherState.useFahrenheit,
        });
    }
}
