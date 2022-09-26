export const mediaFactory = (data) => {
    const { id, photographerId, title, image, likes, date, price } = data;

    const getMediaDOM = () => {

        return document.createRange().createContextualFragment(
                            `<article>
                                <img class="media-section__image" src="assets/medias/Tracy/${image}" alt="${title}, closeup view"></img>
                                <div class="media-section__body">
                                    <span>${title}</span><span>${likes} ♥</span>
                                </div>
                            </article>`);
    };

    return { id, photographerId, title, image, likes, date, price, getMediaDOM }
};