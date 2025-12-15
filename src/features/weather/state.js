let location;
let useFahrenheit;
let fahrenheitTemperature;
let iconId;

let isComplete = false;

function update(data) {
    if (data.location) {
        location = data.location;
    }

    if (data.useFahrenheit !== undefined) {
        useFahrenheit = Boolean(data.useFahrenheit);
    }

    if (data.temperature) {
        fahrenheitTemperature = Number(data.temperature);
    }

    if (data.iconId) {
        iconId = data.iconId;
    }

    isComplete =
        location &&
        useFahrenheit !== undefined &&
        fahrenheitTemperature &&
        iconId;
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
        return isComplete;
    },
};

export default weatherState;
