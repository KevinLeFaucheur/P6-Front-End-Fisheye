export const photographerCard = (data) => {
  const { name, id, city, country, tagline, price, portrait } = data;

  const getCardDOM = () => {

    return document.createRange().createContextualFragment(
      `<article id="${id}">
          <a title='Page personelle de ${name}' class="photographer-cards__link" href="./photographer.html?id=${id}">
              <img src="assets/photographers/${portrait}" alt='${name}'>
              <h2>${name}</h2>
          </a>
          <p class="photographer-cards__location">${city}, ${country}</p>
          <p class="photographer-cards__tagline">${tagline}s</p>
          <p class="photographer-cards__price">${price}€/jour</p>
      </article>`);
  };

  return { name, id, city, country, tagline, price, portrait, getCardDOM }
};