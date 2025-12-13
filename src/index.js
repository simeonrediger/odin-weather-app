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

    const requiredData = extractKeys(data, [
        ['currentConditions', ['temp']],
        'resolvedAddress',
        'timezone',
    ]);

    return requiredData;
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

function extractKeys(data, keys) {
    const extractedData = {};

    for (const key of keys) {
        const hasSubKeys = Array.isArray(key);

        if (!hasSubKeys) {
            extractedData[key] = data[key];
            continue;
        }

        const keyValuePair = key;

        if (keyValuePair.length !== 2) {
            throw new TypeError(
                'Key-value pairs must contain exactly 2 elements. ' +
                    `Got ${keyValuePair.length}.`,
            );
        }

        const [parentKey, subkeys] = key;

        if (!Array.isArray(subkeys)) {
            throw new TypeError(
                `Subkeys must be an Array. Got ${typeof subkeys}.`,
            );
        }

        extractedData[parentKey] = extractKeys(data[parentKey] ?? {}, subkeys);
    }

    return extractedData;
}
