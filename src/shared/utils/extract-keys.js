export default function extractKeys(data, keys) {
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
