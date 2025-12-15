let location;
let useFahrenheit;
let fahrenheitTemperature;
let iconId;

function update(data) {
    if (data.location !== undefined) {
        location = data.location;
    }

    if (data.useFahrenheit !== undefined) {
        useFahrenheit = Boolean(data.useFahrenheit);
    }

    if (data.temperature !== undefined) {
        fahrenheitTemperature = Number(data.temperature);
    }

    if (data.iconId !== undefined) {
        iconId = data.iconId;
    }
}

function getCelsiusTemperature() {
    return (fahrenheitTemperature - 32) * (5 / 9);
}

const weatherState = {
    update,

    get location() {
        return location;
    },

    get useFahrenheit() {
        return useFahrenheit;
    },

    get temperature() {
        return useFahrenheit ? fahrenheitTemperature : getCelsiusTemperature();
    },

    get iconId() {
        return iconId;
    },

    get isComplete() {
        return [location, useFahrenheit, fahrenheitTemperature, iconId].all(
            value => value != undefined,
        );
    },
};

export default weatherState;
