import { addLike } from "../components/likes.js";
import { displayLightbox } from "./lightbox.js";

export const mediaCard = (mediaObject, name) => {
  const { id, photographerId, title, image, video, likes, date, price } = mediaObject;
  const folderName = name.match(/[a-z]+[-][a-z]+|[a-z]+/i);
  mediaObject.folderName = folderName;

  const getMediaDOM = () => {

    const imageFragment = () =>
      `<img 
        tabindex='0' 
        id="${id}" 
        class="photographer-medias__image" 
        src="assets/medias/${folderName}/${image}" 
        alt="${title}, closeup view">
      </img>`;

    const videoFragment = () =>
      `<video 
        tabindex='0' 
        id="${id}" 
        class="photographer-medias__video" 
        src="assets/medias/${folderName}/${video}" 
        type="video/mp4" 
        alt="${title}, closeup view">
      </video>`;
    
    const mediaFragment = document.createRange().createContextualFragment(
      `<article>
        ${image != undefined ? imageFragment() : videoFragment()}
        <div class="photographer-medias__body">
          <h2>${title}</h2>
          <span class="likes" id="like-${id}">
            ${likes} <span role='button' tabindex='0' aria-label='likes' aria-hidden='true' class="photographer-medias__like fa-solid fa-heart">
                     </span>
          </span>
        </button>
        </div>
      </article>`);
      
    mediaFragment
      .querySelector('.photographer-medias__like')
      .addEventListener('click', (event) => 
        addLike(event.target.parentElement.id, parseInt(event.target.parentElement.textContent)) 
    );
      
    mediaFragment
      .querySelector('.photographer-medias__like')
      .addEventListener('keydown', (event) => { if(event.key === 'Enter')
        addLike(event.target.parentElement.id, parseInt(event.target.parentElement.textContent)) 
    });

    mediaFragment
      .querySelector('img, video')
      .addEventListener('click', () => 
        displayLightbox(mediaObject)
    );

    mediaFragment
      .querySelector('img, video')
      .addEventListener('keydown', (event) => { 
        if(event.key === 'Enter') displayLightbox(mediaObject); 
    });
      
    return mediaFragment;
  };

  return { id, photographerId, title, image, video, likes, date, price, folderName, getMediaDOM }
};