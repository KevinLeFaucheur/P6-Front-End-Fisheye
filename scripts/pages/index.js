import * as Data from "../utils/data.js";
import { photographerCard } from "../factories/photographerCard.js";

const displayPhotographerCards = (photographers) => {

  photographers.forEach((photographer) => {
    const photographerCardDOM = photographerCard(photographer).getCardDOM();
    document.querySelector(".photographer-cards").appendChild(photographerCardDOM);
  });

};

const initialize = () => {

  Data.initialize();
  displayPhotographerCards(Data.getPhotographers());
  
};

initialize();