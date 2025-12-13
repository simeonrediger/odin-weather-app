import './styles/reset.css';
import './styles/colors.css';
import './styles/layout.css';

import visualCrossingApiKey from './api-key.js';

import demoData from './demo-data.json';

const weatherData = await getWeatherData('Boston');
console.log(weatherData);

async function getWeatherData(location) {
    // const requestUrl = getWeatherApiRequestUrl(location);
    // const response = await fetch(requestUrl);

    // if (!response.ok) {
    //     await handleBadReponse(response);
    // }

    // const data = await response.json();
    const data = demoData;
    return data;
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

async function handleBadReponse(response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
}
