import defaults from './defaults.js';
import form from './components/weather-form/form.js';
import service from './service.js';
import state from './state.js';
import view from './components/weather-view/view.js';

function init(root) {
    view.init(root);

    form.init(root, {
        onSubmit: handleFormSubmit,
        onTemperatureUnitChange: handleTemperatureUnitChange,
        defaults: defaults.inferFromTimezone('Boston'),
    });
}

async function handleFormSubmit(data, useFahrenheit) {
    const weatherData = await service.getData(data.location);

    state.update({
        useFahrenheit,
        location: weatherData.resolvedAddress,
        temperature: weatherData.currentConditions.temp,
        iconId: weatherData.currentConditions.icon,
    });

    view.render({
        location: state.location,
        temperature: state.temperature,
        useFahrenheit: state.useFahrenheit,
        iconId: state.iconId,
    });
}

function handleTemperatureUnitChange(useFahrenheit) {
    state.update({ useFahrenheit });

    if (state.isComplete) {
        view.renderTemperature({
            temperature: state.temperature,
            useFahrenheit: state.useFahrenheit,
        });
    }
}

const weatherController = {
    init,
};

export default weatherController;
