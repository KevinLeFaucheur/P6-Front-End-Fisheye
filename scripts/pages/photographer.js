//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from "../utils/getPhotographerData.js";
import { photographerHeaderFactory } from "../factories/photographerHeaderFactory.js";
import { pricingInsertFactory } from "../factories/pricingInsertFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { sortingFactory } from "../factories/sortingFactory.js";

const currentPageParamId = parseInt(new URLSearchParams(window.location.search).get('id'));
const photographersData = await getPhotographers();
const currentPagePhotographerData = photographersData.photographers.filter(object => object.id == currentPageParamId)[0];

const getMediasByPhotographerId = (data, id) => {
  return [...data.media].filter(element => element.photographerId == id);
};
const mediasData = getMediasByPhotographerId(photographersData, currentPageParamId);

const displayHeaderData = () => {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerHeaderData = photographerHeaderFactory(currentPagePhotographerData);
  const photographerHeaderDOM = photographerHeaderData.getHeaderDOM();

  photographerHeader.appendChild(photographerHeaderDOM);
};

const displayMediaData = (option) => {
  const main = document.getElementById('main');
  const mediaSection = document.createElement('section');
  mediaSection.classList.add('media-section');

  main.appendChild(mediaSection);
  updateMedias(option);
};

const updateMedias = (option) => {
  const mediaSection = document.querySelector('.media-section');
  mediaSection.innerHTML = '';
  sortingMediasBy(mediasData, option);

  mediasData.forEach(media => {
    const mediaDOM = mediaFactory(media, currentPagePhotographerData.name);
    mediaSection.appendChild(mediaDOM.getMediaDOM());
  });

  const likes = document.querySelectorAll('.media-section__like');
  likes.forEach(element => element.addEventListener('click', () => addLike(element.parentElement.id, parseInt(element.parentElement.textContent))));
};

const sortingMediasBy = (medias, option = 'likes') => {
  switch (option) {
    case 'likes': return medias.sort((a, b) => b.likes - a.likes);
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
  document.getElementById(imageId).innerHTML = ++likeCount + ' <i class="media-section__like fa-solid fa-heart"></i>'; // ++
  updateTotalLikes();
};

const displayInsertData = () => {
  const main = document.getElementById('main');
  const pricingInsertData = pricingInsertFactory(currentPagePhotographerData, getTotalLikes());
  const pricingInsertDOM = pricingInsertData.getInsertDOM();

  main.appendChild(pricingInsertDOM);
};

const displaySortingData = () => {
  const main = document.getElementById('main');
  const sortingData = sortingFactory(mediasData);
  const sortingDOM = sortingData.getSortingDOM();

  sortingDOM.querySelector('.sorting-select').addEventListener('change', event => {
    updateMedias(event.target.value);
  });

  main.appendChild(sortingDOM);
};

const initModal = () => {
  const modalDOM = modalFactory(currentPagePhotographerData.name);
  document.getElementById('main').after(modalDOM.getModalDOM());
};

const init = async () => {
  displayHeaderData();
  displaySortingData();
  displayMediaData();
  displayInsertData();
  initModal();
};

init();