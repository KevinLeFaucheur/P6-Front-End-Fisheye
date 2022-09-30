const displayLightbox = () => {
  const main = document.getElementById('main');
  const header = document.getElementById('header');
  main.style.display = 'none';
  header.style.display = 'none';
  
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "block";
};

const closeLightbox = () => {
  const main = document.getElementById('main');
  const header = document.getElementById('header');
  main.style.display = 'block';
  header.style.display = 'block';
  
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
};

const goToPreviousItem =() => {
  console.log('previous');
};

const goToNextItem =() => {
  console.log('next');
};

const lightboxFactory = (data, name) => {
  const { title, image } = data;
  
  const getLightboxDOM = () => {
    const folderName = name.match(/[a-z]+[-][a-z]+|[a-z]+/i);

    return document.createRange().createContextualFragment(
      `<div id="lightbox">
        <div role="dialog" id="lightbox__wrapper" aria-label="image closeup view">
          <div role="button" class="controls controls-left">
            <span class="lightbox__button lightbox__previous">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-left" onclick="goToPreviousItem()"></i>
            </span>

            <p class="sr-only">Previous</p>
          </div>

          <div class="lightbox__body">
            <img id="lightbox__image" src="assets/medias/${folderName}/${image}" alt="${title}, closeup view"/>
            <h2>${title}</h2>
          </div>

          <div role="button" class="controls controls-right">
            <span class="lightbox__button lightbox__close">
              <i class="fa-3x fa-solid fa-x" onclick="closeLightbox()"></i>
            </span>

            <span class="lightbox__button lightbox__next">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-right" onclick="goToNextItem()"></i>
            </span>

            <p class="sr-only">Next</p>
          </div>

        </div>
      </div>`);
  };

  return { getLightboxDOM }
};

/* <img id="lightbox__close" src="assets/icons/close.svg" onclick="closeLightbox()"/> */