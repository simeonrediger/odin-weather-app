import './styles/reset.css';
import './styles/colors.css';
import './styles/layout.css';

import visualCrossingApiKey from './api-key.js';

const weatherData = await getWeatherData('Boston');
console.log(weatherData);

async function getWeatherData(location) {
    const requestUrl = getWeatherApiRequestUrl(location);
}

function getWeatherApiRequestUrl(location) {
    const apiOrigin = 'https://weather.visualcrossing.com';
    const apiBaseUrl = '/VisualCrossingWebServices/rest/services/timeline/';
    const apiRequestUrl = new URL(apiBaseUrl + location, apiOrigin);

    apiRequestUrl.search = new URLSearchParams({
        key: visualCrossingApiKey,
    });

    return apiRequestUrl;
}
