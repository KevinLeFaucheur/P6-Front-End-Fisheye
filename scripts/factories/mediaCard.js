export const mediaCard = (data, name) => {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const folderName = name.match(/[a-z]+[-][a-z]+|[a-z]+/i);

  const getMediaDOM = () => {

    const imageFragment = () =>
      `<img 
        tabindex='0' 
        id="${id}" 
        class="media-section__image" 
        src="assets/medias/${folderName}/${image}" 
        alt="${title}, closeup view">
      </img>`;

    const videoFragment = () =>
      `<video 
        tabindex='0' 
        id="${id}" 
        class="media-section__video" 
        src="assets/medias/${folderName}/${video}" 
        type="video/mp4" 
        alt="${title}, closeup view">
      </video>`;
    
    const mediaFragment = 
      `<article>
        ${image != undefined ? imageFragment() : videoFragment()}
        <div class="media-section__body">
          <h2>${title}</h2>
          <span class="likes" id="like-${id}">
            ${likes} <span aria-label='likes' aria-hidden='true' class="media-section__like fa-solid fa-heart"></span>
          </span>
        </button>
        </div>
      </article>`;

    return document.createRange().createContextualFragment(mediaFragment);
  };

  return { id, photographerId, title, image, video, likes, date, price, folderName, getMediaDOM }
};