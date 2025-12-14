import './styles/weather-view.css';

let container;

function init(root) {
    cacheElements(root);
}

function cacheElements(root) {
    container = root.querySelector("[data-role='weather-view']");
}

const weatherView = {
    init,
};

export default weatherView;
