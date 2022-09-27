import { getPhotographers } from "../utils/getPhotographerData.js";
import { photographerFactory } from "../factories/photographer.js";

const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
          
    // const photographerLinks = document.getElementsByClassName("photographer_section__link");
    // for (const link of photographerLinks) {
    //     link.addEventListener('click', () => {
    //         console.log(photographers.filter(obj => { return obj.id == link.parentElement.id }));
    //     });
    // }
};

const init = async () => {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();