import visualCrossingApiKey from './api-key.js';

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

// Fragile hack to force Visual Crossing to return a formatted resolvedAddress
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

const weatherService = {
    getData,
};

export default weatherService;
