const jsonFile = 'data/photographers.json';

export const getPhotographers = () => {
  let data = JSON.parse(localStorage.getItem('photographers'));

  if(data == null) {
    init();
    return JSON.parse(localStorage.getItem('photographers'));
  }
  return data;
};

export const getMedias = () => { 
  let data = JSON.parse(localStorage.getItem('media'));

  if(data == null) {
    init();
    return JSON.parse(localStorage.getItem('media'));
  }
  return data;
};

export const getMediasByPhotographerId = (id) => { 
      return getMedias().filter(element => element.photographerId == id);
};

export const init = async () => {
  let response = await fetch(jsonFile);
  const { photographers, media } = await response.json();

  localStorage.setItem('photographers', JSON.stringify(photographers));
  localStorage.setItem('media', JSON.stringify(media));
};