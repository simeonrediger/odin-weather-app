import '@/shared/styles/reset.css';
import '@/shared/styles/colors.css';
import '@/shared/styles/layout.css';

import weatherComponent from './weather/component.js';
import weatherFormComponent from './weather-form/component.js';
import weatherService from './services/weather.js';

weatherComponent.init(document);
weatherFormComponent.init(document, handleWeatherFormSubmit);

async function handleWeatherFormSubmit(data) {
    const weatherData = await weatherService.getData(data.location);
    weatherComponent.render(weatherData, data.useFahrenheit);
}
