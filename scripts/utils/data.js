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

export const getMediasByPhotographerId = (id) => { 
      return getMedias().filter(element => element.photographerId == id);
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

export const sortingMediasBy = (medias, option = 'popularity') => {
  switch (option) {
    case 'popularity': return medias.sort((a, b) => b.likes - a.likes);
    case 'title': return medias.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
    case 'date': return medias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
};