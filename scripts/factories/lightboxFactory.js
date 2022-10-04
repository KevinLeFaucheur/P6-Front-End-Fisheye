const displayLightbox = (mediaObject, mediasData) => {
  const lightboxDOM = lightboxFactory(mediaObject);
  document.getElementById('main').after(lightboxDOM.getLightboxDOM());

  document.querySelector('.lightbox__previous').addEventListener('click', () => { 
    goToPreviousItem(mediaObject.folderName, mediasData);
  });

  document.querySelector('.lightbox__next').addEventListener('click', () => { 
    goToNextItem(mediaObject.folderName, mediasData);
  });
  
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

  if(index > 0) index -= 1;
  else index = mediasData.length-1;

  let nextMedia = mediasData[index];
  nextMedia.folderName = folderName;

  let lightboxBody = document.querySelector('.lightbox__body');
  lightboxBody.innerHTML = '' + lightboxMedia(nextMedia);
};

const goToNextItem = (folderName, mediasData) => {

  let index = mediasData.indexOf(mediasData.find(media => media.id == document.querySelector('.lightbox__image').id));
  let nextMedia = mediasData[(index + 1) % mediasData.length];
  let nextIndex = (index + 1) % mediasData.length;
  nextMedia.folderName = folderName;

  let lightboxBody = document.querySelector('.lightbox__body');
  lightboxBody.innerHTML = '' + lightboxMedia(nextMedia);
};

const lightboxFactory = (mediaNode) => {
  
  const getLightboxDOM = () => {

    const lightboxFragment = 
      `<div class="lightbox">
        <div role="dialog" class="lightbox__wrapper" aria-label="image closeup view">
          <div role="button" class="controls controls-left">
            <span class="lightbox__button lightbox__previous">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-left"></i>
            </span>

            <p class="sr-only">Previous</p>
          </div>

          <div class="lightbox__body">
            ${lightboxMedia(mediaNode)}
          </div>

          <div role="button" class="controls controls-right">
            <span class="lightbox__button lightbox__close">
              <i class="fa-3x fa-solid fa-x" onclick="closeLightbox()"></i>
            </span>

            <span class="lightbox__button lightbox__next">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-right"></i>
            </span>

            <p class="sr-only">Next</p>
          </div>

        </div>
      </div>`;

    return document.createRange().createContextualFragment(lightboxFragment);
  };

  return { mediaNode, getLightboxDOM }
};

const lightboxMedia = (mediaNode) => {
  const { id, title, image, video, folderName } = mediaNode;

  const imageFragment = 
      `<img id="${id}" class="lightbox__image" src="assets/medias/${folderName[0]}/${image}" alt="${title}, closeup view"></img>
      <h2>${title}</h2>`;

  const videoFragment = 
      `<video controls id="${mediaNode.id}" class="lightbox__image" src="assets/medias/${folderName[0]}/${video}" type="video/mp4" alt="${title}, closeup view"></video>
      <h2>${title}</h2>`;

      return mediaNode.hasOwnProperty('image') && mediaNode.image != undefined ? imageFragment : videoFragment;
};