import extractKeys from '@/shared/utils/extract-keys.js';

const visualCrossingApiKey = 'LKLZKMSAFFC85UJ29CC5TKVGY';

async function getData(location) {
    location = formatLocationToTriggerCanonicalization(location);
    const requestUrl = getRequestUrl(location);
    const response = await fetch(requestUrl);

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

    let description;
    switch (response.status) {
        case 400:
            description = getBadRequestDescription(responseText);
            break;
        case 401:
            description = 'Site not authorized to make requests';
            break;
        case 404:
            description = 'Weather server endpoint not found';
            break;
        case 429:
            description = 'Daily request limit reached';
            break;
        case 500:
            description = 'Weather server error';
            break;
        default:
            description = 'Unexpected error occurred';
    }

    const message = `${response.status}: ${description}`;
    throw new Error(message, { cause: responseText });
}

function getBadRequestDescription(responseText) {
    if (responseText.includes('No valid locations')) {
        return weatherService.INVALID_LOCATION;
    } else {
        return 'Unexpected error occurred';
    }
}

const weatherService = {
    getData,
    INVALID_LOCATION: 'Invalid location',
};

export default weatherService;
