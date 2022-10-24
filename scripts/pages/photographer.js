import * as Data from "../utils/data.js";
import * as Likes from "../components/likes.js";
import { photographerHeader } from "../factories/photographerHeader.js";
import { pricingInsert } from "../factories/pricingInsert.js";
import { mediaCard } from "../factories/mediaCard.js";
import { sorting } from "../factories/sorting.js";
import { modalForm, displayModal } from "../factories/modal.js";

// DOM Elements
const main = document.getElementById('main');
const mediaSection = document.querySelector('.photographer-medias');
const sortingSection = document.querySelector('.photographer-sorting');

const currentPagePhotographerData = Data.getPhotographers().find(object => object.id == Data.getCurrentPageIdParam());

export const updateMedias = (mediasData) => {
  mediaSection.innerHTML = '';

  mediasData.forEach(media => {
    const mediaDOM = mediaCard(media, currentPagePhotographerData.name).getMediaDOM();
    mediaSection.appendChild(mediaDOM);
  });
};

const displayHeaderData = () => {
  const photographerHeaderDOM = photographerHeader(currentPagePhotographerData).getHeaderDOM();
  document.querySelector(".photographer-header").appendChild(photographerHeaderDOM);
};

const displaySortingData = () => {
  const sortingDOM = sorting(Data.getMediasByPhotographerId()).getSortingDOM();
  sortingSection.appendChild(sortingDOM);
};

const displayMediaData = () => { updateMedias(Data.getMediasByPhotographerId()); };

const displayInsertData = () => {
  const pricingInsertDOM = pricingInsert(currentPagePhotographerData, Likes.getTotalLikes()).getInsertDOM();
  main.appendChild(pricingInsertDOM);
};

const initializeModal = () => {
  main.after(modalForm(currentPagePhotographerData.name).getModalDOM());
  document.getElementById('contact_button').addEventListener('click', displayModal);
};

const initialize = () => {
  displayHeaderData();
  displaySortingData();
  displayMediaData();
  displayInsertData();  
  initializeModal();
};

initialize();