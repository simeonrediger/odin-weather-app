import badRequestMessages from './bad-request-messages.js';
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

async function handleFormSubmit(location, useFahrenheit) {
    let weatherData;

    try {
        weatherData = await service.getData(location);
    } catch (error) {
        view.renderError(error.message);

        const formIsInvalid = Object.values(badRequestMessages).includes(
            error.message,
        );

        if (formIsInvalid) {
            throw error;
        }

        console.error(error);
        return;
    }

    state.update({
        location: weatherData.resolvedAddress,
        temperature: weatherData.currentConditions.temp,
        useFahrenheit,
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
