export function photographerHeaderFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const getHeaderDOM = () => {

        const header = document.querySelector('.photograph-header');

        // TODO change css class
        return document.createRange().createContextualFragment(
                            `<h1>${name}</h1>
                            <p class="photographer_section__location">${city}, ${country}</p>
                            <p class="photographer_section__tagline">${tagline}s</p>
                            <img src="assets/photographers/${portrait}" alt="portrait de ${portrait}">`);
    };

    return { name, id, city, country, tagline, price, portrait, getHeaderDOM }
}