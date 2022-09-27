export function photographerHeaderFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const getHeaderDOM = () => {

        const header = document.querySelector('.photograph-header');

        return document.createRange().createContextualFragment(
                            `<div>   
                                <h1>${name}</h1>
                                <p class="photograph-header__location">${city}, ${country}</p>
                                <p class="photograph-header__tagline">${tagline}s</p>
                            </div>
                            <img src="assets/photographers/${portrait}" alt="portrait de ${portrait}">`);
    };

    return { name, id, city, country, tagline, price, portrait, getHeaderDOM }
}