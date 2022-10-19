//Mettre le code JavaScript lié à la page photographer.html
import * as Data from "../utils/data.js";
import * as Likes from "../components/likes.js";
import { photographerHeader } from "../factories/photographerHeader.js";
import { pricingInsertFactory } from "../factories/pricingInsert.js";
import { mediaCard } from "../factories/mediaCard.js";
import { sorting } from "../factories/sorting.js";
import { displayLightbox } from "../factories/lightbox.js";
import { modalForm, displayModal } from "../factories/modal.js";

const currentPageParamId = parseInt(new URLSearchParams(window.location.search).get('id'));
const mediasData = Data.getMediasByPhotographerId(currentPageParamId);

const currentPagePhotographerData = Data.getPhotographers().find(object => object.id == currentPageParamId);

export const updateMedias = (option) => {
  const mediaSection = document.querySelector('.media-section');
  mediaSection.innerHTML = '';
  Data.sortingMediasBy(mediasData, option);

  // Only debug / soutenance
  option ??= 'likes';
  console.log('Sorting: ', mediasData.map(media => ({ [option]: media[option === 'popularity' ? 'likes' : option] })));

  mediasData.forEach(media => {
    const mediaObject = mediaCard(media, currentPagePhotographerData.name);
    const mediaDOM = mediaObject.getMediaDOM();
    mediaDOM.querySelector('img, video').addEventListener('click', () => displayLightbox(mediaObject, mediasData));
    mediaDOM.querySelector('img, video').addEventListener('keydown', (event) => { if(event.key === 'Enter') displayLightbox(mediaObject, mediasData); } );
    mediaSection.appendChild(mediaDOM);
  });

  Likes.setupLikes();
};

const displayHeaderData = () => {
  const photographerHeaderDOM = photographerHeader(currentPagePhotographerData).getHeaderDOM();
  document.querySelector(".photograph-header").appendChild(photographerHeaderDOM);
};

const displaySortingData = () => {
  const sortingDOM = sorting(mediasData).getSortingDOM();
  document.getElementById('main').appendChild(sortingDOM);
};

const displayMediaData = (option) => {
  const mediaSection = document.createElement('section');
  mediaSection.classList.add('media-section');
  document.getElementById('main').appendChild(mediaSection);

  updateMedias(option);
};

const displayInsertData = () => {
  const pricingInsertDOM = pricingInsertFactory(currentPagePhotographerData, Likes.getTotalLikes()).getInsertDOM();
  document.getElementById('main').appendChild(pricingInsertDOM);
};

const initModal = () => {
  document.getElementById('main').after(modalForm(currentPagePhotographerData.name).getModalDOM());
  document.querySelector('.contact_button').addEventListener('click', displayModal);
};

const init = () => {
  displayHeaderData();
  displaySortingData();
  displayMediaData();
  displayInsertData();  
  initModal();
};

init();