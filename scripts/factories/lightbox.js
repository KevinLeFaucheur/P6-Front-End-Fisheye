import * as Data from "../utils/data.js";

let lastFocus;

export const displayLightbox = (mediaObject) => {
  document.getElementById('main').after(lightboxFactory(mediaObject).getLightboxDOM());
  const lightbox = document.getElementById('lightbox');
  document.getElementById('main').style.display = 'none';
  document.getElementById('header').style.display = 'none';
  lightbox.style.display = 'block';

  lightboxOnlyFocus(lightbox)
  lastFocus = document.activeElement;
};

const closeLightbox = () => {
  document.getElementById('lightbox').remove();
  document.getElementById('main').style.display = 'block';
  document.getElementById('header').style.display = 'block';
  lastFocus.focus();
};

const goToItem = (folderName, direction) => {
  let mediasData = Data.getMediasByPhotographerId();
  let index = mediasData.indexOf(mediasData.find(media => media.id == document.querySelector('.lightbox__image').id));

  if(direction === 'next') {
    index = (index + 1) % mediasData.length;
  } else {
    if(index > 0) index--;
    else index = mediasData.length-1;
  }

  let newMedia = mediasData[index];
  newMedia.folderName = folderName;
  document.querySelector('.lightbox__body').innerHTML = '' + lightboxMedia(newMedia);
};

const lightboxFactory = (mediaData) => {
  
  const getLightboxDOM = () => {

    const lightboxFragment = document.createRange().createContextualFragment(
      `<div id='lightbox' class="lightbox">
        <div role="dialog" class="lightbox__wrapper" aria-label="image closeup view">

          <div class="controls controls-left">
            <button aria-label='Previous Image' class="lightbox__button lightbox__previous">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-left"></i>
            </button>
            <p class="sr-only">Previous</p>
          </div>  

          <div class="lightbox__body">
            ${lightboxMedia(mediaData)}
          </div>

          <div class="controls controls-right">
            <button aria-label='Next Image' class="lightbox__button lightbox__next">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-right"></i>
            </button>
            <p class="sr-only">Next</p>

            <button aria-label='Close dialog' class="lightbox__button lightbox__close">
              <i aria-hidden="true" class="fa-3x fa-solid fa-x"></i>
            </button>
            <p class="sr-only">Close</p>
          </div>

        </div>
      </div>`);

    lightboxEventListeners(lightboxFragment, mediaData.folderName);

    return lightboxFragment;
  };

  return { mediaData, getLightboxDOM }
};

const lightboxMedia = (mediaData) => {
  const { id, title, image, video, folderName } = mediaData;

  const imageFragment = 
    `<img 
      id="${id}" 
      class="lightbox__image" 
      src="assets/medias/${folderName[0]}/${image}" 
      alt="${title}, closeup view">
    </img>
    <h2>${title}</h2>`;

  const videoFragment = 
    `<video 
      controls 
      id="${id}" 
      class="lightbox__image" 
      src="assets/medias/${folderName[0]}/${video}" 
      type="video/mp4" 
      alt="${title}, closeup view">
    </video>
    <h2>${title}</h2>`;

    return image != undefined ? imageFragment : videoFragment;
};

const lightboxEventListeners = (fragment, folderName) => { 
  const lightboxPrevious = fragment.querySelector('.lightbox__previous');
  const lightboxNext = fragment.querySelector('.lightbox__next');
  const lightboxClose = fragment.querySelector('.lightbox__close');

  lightboxPrevious.addEventListener('click', () => goToItem(folderName, 'previous'));
  lightboxNext.addEventListener('click', () => goToItem(folderName, 'next'));
  lightboxClose.addEventListener('click', closeLightbox);

  lightboxPrevious.addEventListener('keydown', (event) => { if(event.key === 'Enter') goToItem(folderName, 'previous') });
  lightboxNext.addEventListener('keydown', (event) => { if(event.key === 'Enter') goToItem(folderName, 'next') });
  lightboxClose.addEventListener('keydown', (event) => { if(event.key === 'Enter') closeLightbox });
  
  document.addEventListener('keydown', (event) => { if(event.key === 'ArrowLeft') goToItem(folderName, 'previous'); });
  document.addEventListener('keydown', (event) => { if(event.key === 'ArrowRight') goToItem(folderName, 'next'); });
  document.addEventListener('keydown', (event) => { if(event.key === 'Escape') closeLightbox(); });
};

const lightboxOnlyFocus = (lightbox) => {
  const focusableElements = lightbox.querySelectorAll('.lightbox__previous, .lightbox__next, .lightbox__close');
  const firstFocusable = focusableElements[0];  
  const lastFocusable = focusableElements[focusableElements.length - 1];

  lightbox.addEventListener('keydown', (event) => {
    if (!(event.key === 'Tab' || event.keyCode === 9)) return;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  });
}

// const intervalID = setInterval(() => goToNextItem(mediaObject.folderName, mediasData), 3000);
// clearInterval(intervalID);