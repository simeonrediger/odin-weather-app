import './shared/styles/reset.css';
import './shared/styles/colors.css';
import './shared/styles/layout.css';

import weatherController from './features/weather/controller.js';

weatherController.init(document);
