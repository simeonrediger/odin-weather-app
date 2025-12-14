let location;
let useFahrenheit;
let fahrenheitTemperature;

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
};

export default weatherState;
