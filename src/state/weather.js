let location;
let useFahrenheit;
let fahrenheitTemperature;
let iconId;

function update(data) {
    if (data.location) {
        location = data.location;
    }

    if (data.useFahrenheit !== undefined) {
        useFahrenheit = Boolean(data.useFahrenheit);
    }

    if (data.temperature) {
        fahrenheitTemperature = data.temperature;
    }

    if (data.iconId) {
        iconId = data.iconId;
    }
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
        if (useFahrenheit) {
            return fahrenheitTemperature;
        } else {
            const celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
            return celsiusTemperature;
        }
    },

    get iconId() {
        return iconId;
    },
};

export default weatherState;
