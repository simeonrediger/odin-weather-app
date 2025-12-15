import fahrenheitTimezones from '@/data/fahrenheit-timezones.json';

function inferFromTimezone(fallbackLocation) {
    const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const useFahrenheit = fahrenheitTimezones.includes(systemTimezone);
    let location;

    if (systemTimezone.includes('/')) {
        const timezoneParts = systemTimezone.split('/');
        const lastTimezonePart = timezoneParts[timezoneParts.length - 1];
        location = lastTimezonePart.replaceAll('_', ' ');
    } else {
        location = fallbackLocation;
    }

    return { location, useFahrenheit };
}

const defaults = {
    inferFromTimezone,
};

export default defaults;
