export const mediaFactory = (data, name) => {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const getMediaDOM = () => {
    const folderName = name.match(/[a-z]+[-][a-z]+|[a-z]+/i);

    return document.createRange().createContextualFragment(
          `<article>
              <img class="media-section__image" src="assets/medias/${folderName}/${image}" alt="${title}, closeup view" onclick="displayLightbox()"></img>
              <div class="media-section__body">
                  <span>${title}</span><span class="likes" id="${id}">${likes} <i class="media-section__like fa-solid fa-heart"></i></span>
              </div>
          </article>`);
  };

  return { id, photographerId, title, image, video, likes, date, price, getMediaDOM }
};