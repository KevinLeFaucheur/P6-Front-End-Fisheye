export const displayLightbox = (mediaObject, mediasData) => {

  // const intervalID = setInterval(() => goToNextItem(mediaObject.folderName, mediasData), 3000);
  // clearInterval(intervalID);

  document.getElementById('main').after(lightboxFactory(mediaObject).getLightboxDOM());

  const lightboxPrevious = document.querySelector('.lightbox__previous');
  const lightboxNext = document.querySelector('.lightbox__next');
  const lightboxClose = document.querySelector('.lightbox__close');

  lightboxPrevious.addEventListener('click', () => goToPreviousItem(mediaObject.folderName, mediasData));
  lightboxNext.addEventListener('click', () => goToNextItem(mediaObject.folderName, mediasData));
  lightboxClose.addEventListener('click', closeLightbox);

  lightboxPrevious.addEventListener('keydown', (event) => { if(event.key === 'Enter') goToPreviousItem(mediaObject.folderName, mediasData) });
  lightboxNext.addEventListener('keydown', (event) => { if(event.key === 'Enter') goToNextItem(mediaObject.folderName, mediasData) });
  lightboxClose.addEventListener('keydown', (event) => { if(event.key === 'Enter') closeLightbox });
  document.addEventListener('keydown', (event) => { if(event.key === 'ArrowLeft') goToPreviousItem(mediaObject.folderName, mediasData); });
  document.addEventListener('keydown', (event) => { if(event.key === 'ArrowRight') goToNextItem(mediaObject.folderName, mediasData); });
  document.addEventListener('keydown', (event) => { if(event.key === 'Escape') closeLightbox(); });
  
  document.getElementById('main').style.display = 'none';
  document.getElementById('header').style.display = 'none';
  document.querySelector('.lightbox').style.display = 'block';
};

const closeLightbox = () => {
  document.getElementById('main').style.display = 'block';
  document.getElementById('header').style.display = 'block';
  document.querySelector('.lightbox').style.display = 'none';
};

const goToPreviousItem = (folderName, mediasData) => {
  let index = mediasData.indexOf(mediasData.find(media => media.id == document.querySelector('.lightbox__image').id));

  if(index > 0) index--;
  else index = mediasData.length-1;

  let previousMedia = mediasData[index];
  previousMedia.folderName = folderName;
  document.querySelector('.lightbox__body').innerHTML = '' + lightboxMedia(previousMedia);
};

const goToNextItem = (folderName, mediasData) => {
  let index = mediasData.indexOf(mediasData.find(media => media.id == document.querySelector('.lightbox__image').id));

  let nextMedia = mediasData[(index + 1) % mediasData.length];
  nextMedia.folderName = folderName;
  document.querySelector('.lightbox__body').innerHTML = '' + lightboxMedia(nextMedia);
};

const lightboxFactory = (mediaData) => {
  
  const getLightboxDOM = () => {

    const lightboxFragment = 
      `<div class="lightbox">
        <div role="dialog" class="lightbox__wrapper" aria-label="image closeup view">

          <div role="button" class="controls controls-left">
            <button aria-label='Previous Image' class="lightbox__button lightbox__previous">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-left"></i>
            </button>
            <p class="sr-only">Previous</p>
          </div>

          <div class="lightbox__body">
            ${lightboxMedia(mediaData)}
          </div>

          <div role="button" class="controls controls-right">
            <button aria-label='Next Image' class="lightbox__button lightbox__next">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-right"></i>
            </button>
            <p class="sr-only">Next</p>

            <button aria-label='Close dialog' class="lightbox__button lightbox__close">
              <i class="fa-3x fa-solid fa-x"></i>
            </button>
            <p class="sr-only">Close</p>
          </div>

        </div>
      </div>`;

    return document.createRange().createContextualFragment(lightboxFragment);
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