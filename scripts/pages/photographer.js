//Mettre le code JavaScript lié à la page photographer.html
import { photographerHeaderFactory } from "../factories/photographerHeaderFactory.js";
import { pricingInsertFactory } from "../factories/pricingInsertFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";
// import { getPhotographers } from "../pages/index.js";

const getPhotographers = async () => {
    const response = await fetch('../data/photographers.json');
    return response.json();
};

const photographersData = await getPhotographers();

// returns an array of medias by photographer id
const getMediasByPhotographerId = async (data, id) => {
    // let medias = [...data.media]; 
    // const mediaMapped = [...data.media].filter(element => element.photographerId === id);
    return [...data.media].filter(element => element.photographerId == id);
};

// get URL params by name, result parsed as number
const getCurrentPageParamByName = (paramName) => new URLSearchParams(window.location.search).get(paramName);
const currentPageParamId = parseInt(getCurrentPageParamByName('id'));

// get current page medias by photographer id
const mediasData = getMediasByPhotographerId(await getPhotographers(), currentPageParamId);

// get this current page photographer data by id
const photographerData = photographersData.photographers.filter(object => object.id == currentPageParamId)[0];
// console.log(photographerData.name.match(/^[a-z]+[-][a-z]+|^[a-z]+/i));

const displayHeaderData = async () => {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerHeaderData = photographerHeaderFactory(photographerData);
    const photographerHeaderDOM = photographerHeaderData.getHeaderDOM();

    photographerHeader.appendChild(photographerHeaderDOM);
};

const displayInsertData = async () => {
    const main = document.getElementById('main');
    const pricingInsertData = pricingInsertFactory(photographerData);
    const pricingInsertDOM = pricingInsertData.getInsertDOM();

    main.appendChild(pricingInsertDOM);
};

const displayMediaData = async () => {
    const main = document.getElementById('main');
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('media-section');
    
    main.appendChild(mediaSection);

    (await mediasData).forEach(media => {
        const mediaDOM = mediaFactory(media, photographerData.name);
        mediaSection.appendChild(mediaDOM.getMediaDOM());
    });
};

displayHeaderData();
displayMediaData();
displayInsertData();