export function photographerHeader(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const getHeaderDOM = () => {

    return document.createRange().createContextualFragment(
      `<div>   
          <h1>${name}</h1>
          <p class="photographer-header__location">${city}, ${country}</p>
          <p class="photographer-header__tagline">${tagline}s</p>
      </div>
      <img src="assets/photographers/${portrait}" alt="${name}">`);
  };

  return { name, id, city, country, tagline, price, portrait, getHeaderDOM }
}