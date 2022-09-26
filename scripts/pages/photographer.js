//Mettre le code JavaScript lié à la page photographer.html
import { photographerHeaderFactory } from "../factories/photographerHeaderFactory.js";
import { pricingInsertFactory } from "../factories/pricingInsertFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";

async function getPhotographers() {

    const request = '../data/photographers.json';
    const photographers = await fetch(request)
                                .then(response => {
                                    if(response.ok) {
                                        return response.json();
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                });    
    return ( photographers );
}

const photographersData = await getPhotographers();

async function getMediasByPhotographerId(data, id) {
    let medias = [...data.media]; 
    const mediaMapped = medias.filter( element => element.photographerId === id );
    return mediaMapped;
};

const mediasData = getMediasByPhotographerId(await getPhotographers(), 82);
const params = new URLSearchParams(window.location.search);
const idParam = params.get('id');
let photographerData = photographersData.photographers.filter(object => object.id == idParam)[0];

async function displayHeaderData() {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerHeaderData = photographerHeaderFactory(photographerData);

    const photographerHeaderDOM = photographerHeaderData.getHeaderDOM();

    photographerHeader.appendChild(photographerHeaderDOM);
}

async function displayInsertData() {
    const main = document.getElementById('main');
    const pricingInsertData = pricingInsertFactory(photographerData);

    const pricingInsertDOM = pricingInsertData.getInsertDOM();

    main.appendChild(pricingInsertDOM);
}

async function displayMediaData() {
    const main = document.getElementById('main');
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('media-section');
    main.appendChild(mediaSection);

    (await mediasData).forEach(media => {
        const mediaDOM = mediaFactory(media);
        mediaSection.appendChild(mediaDOM.getMediaDOM());
    });
}

displayHeaderData();
displayMediaData();
displayInsertData();