export const photographerCard = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;

    const getCardDOM = () => {

        return document.createRange().createContextualFragment(
                            `<article id="${id}">
                                <a class="photographer_section__link" href="./photographer.html?id=${id}" alt='${name}'>
                                    <img src="assets/photographers/${portrait}" alt="">
                                    <h2>${name}</h2>
                                </a>
                                <p class="photographer_section__location">${city}, ${country}</p>
                                <p class="photographer_section__tagline">${tagline}s</p>
                                <p class="photographer_section__price">${price}€/jour</p>
                            </article>`);
    };

    return { name, id, city, country, tagline, price, portrait, getCardDOM }
};