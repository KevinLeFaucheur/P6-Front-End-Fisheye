import * as Data from "../utils/data.js";
import { photographerCard } from "../factories/photographerCard.js";

const displayPhotographerCards = (photographers) => {

  photographers.forEach((photographer) => {
    const userCardDOM = photographerCard(photographer).getCardDOM();
    document.querySelector(".photographer_section").appendChild(userCardDOM);
  });

};

const init = () => {

  Data.init();
  displayPhotographerCards(Data.getPhotographers());
  
};

init();