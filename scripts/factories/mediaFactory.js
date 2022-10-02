export const mediaFactory = (data, name) => {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const getMediaDOM = () => {
    const folderName = name.match(/[a-z]+[-][a-z]+|[a-z]+/i);
    
    const imageFragment = 
        `<article>
            <img class="media-section__image" src="assets/medias/${folderName}/${image}" alt="${title}, closeup view"></img>
            <div class="media-section__body">
                <span>${title}</span><span class="likes" id="${id}">${likes} <i class="media-section__like fa-solid fa-heart"></i></span>
            </div>
          </article>`;

    const videoFragment = 
        `<article>
          <video class="media-section__video" src="assets/medias/${folderName}/${video}" type="video/mp4" alt="${title}"></video>
          <div class="media-section__body">
              <span>${title}</span><span class="likes" id="${id}">${likes} <i class="media-section__like fa-solid fa-heart"></i></span>
          </div>
        </article>`;

    const mediaNode = document.createRange().createContextualFragment(data.hasOwnProperty('image') ? imageFragment : videoFragment); 
    mediaNode.querySelector('img, video').addEventListener('click', (event) => displayLightbox(event.target));

    return mediaNode;
  };

  return { id, photographerId, title, image, video, likes, date, price, getMediaDOM }
};