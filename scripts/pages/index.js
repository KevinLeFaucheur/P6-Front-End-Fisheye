import { getPhotographers } from "../utils/getPhotographerData.js";
import { photographerFactory } from "../factories/photographer.js";

const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = photographerFactory(photographer).getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

const init = async () => {
    const { photographers } = await getPhotographers();
    console.log(photographers);
    displayData(photographers);
};

init();