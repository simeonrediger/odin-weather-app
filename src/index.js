import './styles/reset.css';
import './styles/colors.css';
import './styles/layout.css';

const weatherData = await getWeatherData('Boston');
console.log(weatherData);

async function getWeatherData(location) {}
