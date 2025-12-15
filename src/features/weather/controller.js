import defaults from '@/utils/defaults.js';
import component from './components/weather/component.js';
import formComponent from './components/weather-form/component.js';
import service from './service.js';
import state from './state.js';

function init(root) {
    component.init(root);

    formComponent.init(root, {
        onSubmit: handleWeatherFormSubmit,
        onTemperatureUnitChange: handleTemperatureUnitChange,
        defaults: defaults.infer('Boston'),
    });
}

async function handleWeatherFormSubmit(data, useFahrenheit) {
    const weatherData = await service.getData(data.location);

    state.update({
        useFahrenheit,
        location: weatherData.resolvedAddress,
        temperature: weatherData.currentConditions.temp,
        iconId: weatherData.currentConditions.icon,
    });

    component.render({
        location: state.location,
        temperature: state.temperature,
        useFahrenheit: state.useFahrenheit,
        iconId: state.iconId,
    });
}

function handleTemperatureUnitChange(useFahrenheit) {
    state.update({ useFahrenheit });

    if (state.isComplete) {
        component.renderTemperature({
            temperature: state.temperature,
            useFahrenheit: state.useFahrenheit,
        });
    }
}

const weatherController = {
    init,
};

export default weatherController;
