//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from "../utils/getPhotographerData.js";
import { photographerHeaderFactory } from "../factories/photographerHeaderFactory.js";
import { pricingInsertFactory } from "../factories/pricingInsertFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";

const currentPageParamId = parseInt(new URLSearchParams(window.location.search).get('id'));
const photographersData = await getPhotographers();
const currentPagePhotographerData = photographersData.photographers.filter(object => object.id == currentPageParamId)[0];

const getMediasByPhotographerId = async (data, id) => {
    return [...data.media].filter(element => element.photographerId == id);
};
// const mediasData = await getMediasByPhotographerId(photographersData, currentPageParamId);

const addLike = (imageId, likeCount) => {
    document.getElementById(imageId).innerHTML = likeCount++ + ' <i class="media-section__like fa-solid fa-heart"></i>';
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
    const mediasData = await getMediasByPhotographerId(photographersData, currentPageParamId);
    
    mediasData.forEach(media => {
        const mediaDOM = mediaFactory(media, currentPagePhotographerData.name);

        mediaSection.appendChild(mediaDOM.getMediaDOM());
    });

    const medias = document.querySelectorAll('.media-section__image');
    medias.forEach(image => image.addEventListener('click', displayLightbox));

    const likes = document.querySelectorAll('.media-section__like');
    likes.forEach(element => element.addEventListener('click', addLike(element.parentElement.id, parseInt(element.parentElement.textContent))));
};

const getTotalLikes = () => {
    let totalLikes = 0;
    const likes = document.querySelectorAll('.likes');
    likes.forEach(element => totalLikes += parseInt(element.textContent));
    console.log(likes);
    
    return totalLikes;
}

const displayInsertData = async () => {
    const main = document.getElementById('main');
    const pricingInsertData = pricingInsertFactory(currentPagePhotographerData, getTotalLikes());
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