let location;
let useFahrenheit;
let fahrenheitTemperature;

function update(values) {
    if (values.location) {
        location = values.location;
    }

    if (values.useFahrenheit) {
        useFahrenheit = Boolean(values.useFahrenheit);
    }

    if (values.temperature) {
        fahrenheitTemperature = values.temperature;
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
