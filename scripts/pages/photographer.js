//Mettre le code JavaScript lié à la page photographer.html
import * as Data from "../utils/data.js";
import { photographerHeader } from "../factories/photographerHeader.js";
import { pricingInsertFactory } from "../factories/pricingInsert.js";
import { mediaCard } from "../factories/mediaCard.js";
import { sorting } from "../factories/sorting.js";
import { displayLightbox } from "../factories/lightbox.js";
import { modalForm, displayModal } from "../factories/modal.js";

const currentPageParamId = parseInt(new URLSearchParams(window.location.search).get('id'));
const currentPagePhotographerData = Data.getPhotographers().find(object => object.id == currentPageParamId);
const mediasData = Data.getMediasByPhotographerId(currentPageParamId);

const displayHeaderData = () => {
  const photographerHeaderDOM = photographerHeader(currentPagePhotographerData).getHeaderDOM();
  document.querySelector(".photograph-header").appendChild(photographerHeaderDOM);
};

const displayMediaData = (option) => {
  const mediaSection = document.createElement('section');
  mediaSection.classList.add('media-section');
  document.getElementById('main').appendChild(mediaSection);

  updateMedias(option);
};

export const updateMedias = (option) => {
  const mediaSection = document.querySelector('.media-section');
  mediaSection.innerHTML = '';
  sortingMediasBy(mediasData, option);

  // Only debug / soutenance
  option ??= 'likes';
  console.log(mediasData.map(media => ({ [option]: media[option === 'popularity' ? 'likes' : option] })));

  mediasData.forEach(media => {
    const mediaObject = mediaCard(media, currentPagePhotographerData.name);
    const mediaDOM = mediaObject.getMediaDOM();
    mediaDOM.querySelector('img, video').addEventListener('click', () => displayLightbox(mediaObject, mediasData));
    mediaSection.appendChild(mediaDOM);
  });

  const likes = document.querySelectorAll('.media-section__like');
  likes.forEach(element => element.addEventListener('click', 
    () => addLike(element.parentElement.id, parseInt(element.parentElement.textContent))));
};

const sortingMediasBy = (medias, option = 'popularity') => {
  switch (option) {
    case 'popularity': return medias.sort((a, b) => b.likes - a.likes);
    case 'title': return medias.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
    case 'date': return medias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
};

const getTotalLikes = () => {
  let totalLikes = 0;
  document.querySelectorAll('.likes').forEach(element => totalLikes += parseInt(element.textContent));
  return totalLikes;
};

const updateTotalLikes = () => {
  document.getElementById('pricing-insert__likes').innerHTML = `${getTotalLikes()} <i class="fa-solid fa-heart"></i>`;
};

const addLike = (imageId, likeCount) => {
  document.getElementById(imageId).innerHTML = ++likeCount + ' <i class="media-section__like fa-solid fa-heart"></i>';
  updateTotalLikes();
};

const displayInsertData = () => {
  const pricingInsertDOM = pricingInsertFactory(currentPagePhotographerData, getTotalLikes()).getInsertDOM();
  document.getElementById('main').appendChild(pricingInsertDOM);
};

const displaySortingData = () => {
  const sortingDOM = sorting(mediasData).getSortingDOM();
  document.getElementById('main').appendChild(sortingDOM);
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