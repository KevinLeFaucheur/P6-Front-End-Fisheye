export const mediaCard = (data, name) => {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const folderName = name.match(/[a-z]+[-][a-z]+|[a-z]+/i);

  const getMediaDOM = () => {
    
    const imageFragment = 
        `<article>
            <img id="${id}" class="media-section__image" src="assets/medias/${folderName}/${image}" alt="${title}, closeup view"></img>
            <div class="media-section__body">
              <h3>${title}</h3><span class="likes" id="like-${id}">${likes} <i aria-label='likes' class="media-section__like fa-solid fa-heart"></i></span>
            </div>
          </article>`;

    const videoFragment = 
        `<article>
          <video id="${id}" class="media-section__video" src="assets/medias/${folderName}/${video}" type="video/mp4" alt="${title}, closeup view"></video>
          <div class="media-section__body">
            <h3>${title}</h3><span class="likes" id="like-${id}">${likes} <i aria-label='likes' class="media-section__like fa-solid fa-heart"></i></span>
          </div>
        </article>`;

    return document.createRange().createContextualFragment(image != undefined ? imageFragment : videoFragment);
  };

  return { id, photographerId, title, image, video, likes, date, price, folderName, getMediaDOM }
};


// {/* <track default kind="descriptions" srclang="en" src="/medias/desc/"> */}