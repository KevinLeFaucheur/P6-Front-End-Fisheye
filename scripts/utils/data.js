const jsonFile = 'data/photographers.json';

export const getPhotographers = () => {
  let data = JSON.parse(localStorage.getItem('photographers'));

  if(data == null) {
    initialize();
    return JSON.parse(localStorage.getItem('photographers'));
  }
  return data;
};

export const getMedias = () => { 
  let data = JSON.parse(localStorage.getItem('media'));

  if(data == null) {
    initialize();
    return JSON.parse(localStorage.getItem('media'));
  }
  return data;
};

export const getMediasByPhotographerId = () => { 
      return getMedias().filter(element => element.photographerId == getCurrentPageIdParam());
};

export const initialize = async () => {
  let response = await fetch(jsonFile);
  if(response.ok) {
    const { photographers, media } = await response.json();
  
    localStorage.setItem('photographers', JSON.stringify(photographers));
    localStorage.setItem('media', JSON.stringify(media));
    
  } else {
    console.error(response.status);
  }
};

export const getCurrentPageIdParam = () => {
  return parseInt(new URLSearchParams(window.location.search).get('id'));
};