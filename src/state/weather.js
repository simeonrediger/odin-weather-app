let location;
let useFahrenheit;
let fahrenheitTemperature;

const weatherState = {
    get location() {
        return location;
    },

    set location(newLocation) {
        location = newLocation;
    },

    get useFahrenheit() {
        return useFahrenheit;
    },

    set useFahrenheit(newUseFahrenheit) {
        useFahrenheit = Boolean(newUseFahrenheit);
    },

    get temperature() {
        if (useFahrenheit) {
            return fahrenheitTemperature;
        } else {
            const celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
            return celsiusTemperature;
        }
    },

    set temperature(newFahrenheitTemperature) {
        fahrenheitTemperature = newFahrenheitTemperature;
    },
};

export default weatherState;
