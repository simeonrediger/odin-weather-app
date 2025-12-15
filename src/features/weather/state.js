let location;
let fahrenheitTemperature;
let useFahrenheit;
let iconId;

function update(data) {
    if (data.location !== undefined) {
        location = data.location;
    }

    if (data.temperature !== undefined) {
        fahrenheitTemperature = Number(data.temperature);
    }

    if (data.useFahrenheit !== undefined) {
        useFahrenheit = Boolean(data.useFahrenheit);
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

    get temperature() {
        return useFahrenheit ? fahrenheitTemperature : getCelsiusTemperature();
    },

    get useFahrenheit() {
        return useFahrenheit;
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
