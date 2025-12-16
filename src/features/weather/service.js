import badRequestMessages from './bad-request-messages.js';
import extractKeys from '@/shared/utils/extract-keys.js';

const visualCrossingApiKey = 'LKLZKMSAFFC85UJ29CC5TKVGY';

async function getData(location) {
    location = formatLocationToTriggerCanonicalization(location);
    const requestUrl = getRequestUrl(location);
    let response;

    try {
        response = await fetch(requestUrl);
    } catch (error) {
        if (error.message.includes('NetworkError')) {
            throw new Error('A network error occurred');
        }

        throw error;
    }

    if (!response.ok) {
        await handleBadReponse(response);
    }

    const data = await response.json();

    const requiredData = extractKeys(data, [
        ['currentConditions', ['icon', 'temp']],
        'resolvedAddress',
        'timezone',
    ]);

    return requiredData;
}

// Fragile hack to cause Visual Crossing to return a formatted resolvedAddress
function formatLocationToTriggerCanonicalization(location) {
    return '-' + location;
}

function getRequestUrl(location) {
    const apiOrigin = 'https://weather.visualcrossing.com';
    const apiBaseUrl = '/VisualCrossingWebServices/rest/services/timeline/';
    const requestUrl = new URL(apiBaseUrl + location, apiOrigin);

    requestUrl.search = new URLSearchParams({
        key: visualCrossingApiKey,
    });

    return requestUrl;
}

// Visual Crossing HTTP error codes: https://www.visualcrossing.com/resources/documentation/weather-api/http-error-codes/
async function handleBadReponse(response) {
    let responseText = await response.text();
    let message;

    switch (response.status) {
        case 400:
            message = getBadRequestDescription(responseText);
            break;
        case 401:
            message = 'Site not authorized to make requests';
            break;
        case 404:
            message = 'Weather server endpoint not found';
            break;
        case 429:
            message = 'Daily request limit reached';
            break;
        case 500:
            message = 'Weather server error';
            break;
        default:
            message = 'Unexpected error occurred';
    }

    throw new Error(message, { cause: responseText });
}

function getBadRequestDescription(responseText) {
    if (responseText.includes('No valid locations')) {
        return badRequestMessages.INVALID_LOCATION;
    } else if (responseText.includes('Address is too short')) {
        return badRequestMessages.LOCATION_TOO_SHORT;
    } else {
        return 'Unexpected error occurred';
    }
}

const weatherService = {
    getData,
};

export default weatherService;
