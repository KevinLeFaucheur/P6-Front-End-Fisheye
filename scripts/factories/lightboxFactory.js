const displayLightbox = (target) => {
  const lightboxDOM = lightboxFactory(target);
  document.getElementById('main').after(lightboxDOM.getLightboxDOM());
  
  document.getElementById('main').style.display = 'none';
  document.getElementById('header').style.display = 'none';
  document.querySelector(".lightbox").style.display = "block";
};

const closeLightbox = () => {
  document.getElementById('main').style.display = 'block';
  document.getElementById('header').style.display = 'block';
  document.querySelector(".lightbox").style.display = "none";
};

const goToPreviousItem =() => {
  console.log('previous');
};

const goToNextItem =() => {
  console.log('next');
};

const lightboxFactory = (target) => {
  const mediaNode = target;
  
  const getLightboxDOM = () => {
    mediaNode.className = '';
    mediaNode.classList.add('lightbox__image');

    const lightboxFragment = 
      `<div class="lightbox">
        <div role="dialog" class="lightbox__wrapper" aria-label="image closeup view">
          <div role="button" class="controls controls-left">
            <span class="lightbox__button lightbox__previous">
              <i aria-hidden="true" class="fa-4x fa-solid fa-angle-left" onclick="goToPreviousItem()"></i>
            </span>

            <p class="sr-only">Previous</p>
          </div>

          <div class="lightbox__body">
            ${mediaNode.outerHTML}
            <h2>${mediaNode.alt}</h2>
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
      </div>`;

      const lightboxNode = document.createRange().createContextualFragment(lightboxFragment);

    return lightboxNode;
  };

  return { mediaNode, getLightboxDOM }
};