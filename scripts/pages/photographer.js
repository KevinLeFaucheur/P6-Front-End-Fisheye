//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from "../utils/getPhotographerData.js";
import { photographerHeaderFactory } from "../factories/photographerHeaderFactory.js";
import { pricingInsertFactory } from "../factories/pricingInsertFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";

const currentPageParamId = parseInt(new URLSearchParams(window.location.search).get('id'));
const photographersData = await getPhotographers();
const currentPagePhotographerData = photographersData.photographers.filter(object => object.id == currentPageParamId)[0];
let likesTotal = 0;

const getMediasByPhotographerId = async (data, id) => {
    return [...data.media].filter(element => element.photographerId == id);
};

const displayHeaderData = async () => {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerHeaderData = photographerHeaderFactory(currentPagePhotographerData);
    const photographerHeaderDOM = photographerHeaderData.getHeaderDOM();

    photographerHeader.appendChild(photographerHeaderDOM);
};

const displayMediaData = async () => {
    const main = document.getElementById('main');
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('media-section');

    main.appendChild(mediaSection);

    // get current page medias by photographer id
    const mediasData = getMediasByPhotographerId(photographersData, currentPageParamId);
    
    (await mediasData).forEach(media => {
        const mediaDOM = mediaFactory(media, currentPagePhotographerData.name);
        console.log(currentPagePhotographerData.likes);
        likesTotal += parseInt(currentPagePhotographerData.likes);
        
        mediaSection.appendChild(mediaDOM.getMediaDOM());
    });

    console.log(likesTotal);
};

const displayInsertData = async () => {
    const main = document.getElementById('main');
    const pricingInsertData = pricingInsertFactory(currentPagePhotographerData, likesTotal);
    const pricingInsertDOM = pricingInsertData.getInsertDOM();

    main.appendChild(pricingInsertDOM);
};

const initModal = () => {
    const modalDOM = modalFactory(currentPagePhotographerData.name);
    document.getElementById('main').after(modalDOM.getModalDOM());
};

const initLightbox = () => {
    const lightboxDOM = lightboxFactory(currentPagePhotographerData.name);
    document.getElementById('main').after(lightboxDOM.getLightboxDOM());
};

const init = async () => {
    displayHeaderData();
    displayMediaData();
    displayInsertData();
    initModal();
    initLightbox();
};

init();