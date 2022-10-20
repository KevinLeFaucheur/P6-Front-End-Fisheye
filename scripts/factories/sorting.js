import { updateMedias } from "../pages/photographer.js";
import * as Data from "../utils/data.js";

export const sorting = (data) => {
  const { title, likes, date } = data;

  const getSortingDOM = () => {

    const sortingFragment = document.createRange().createContextualFragment(
      `<label for='sorting-select'>Trier par</label>
      <div aria-label="Trier Medias" class='select-box'>
      
        <div tabindex="0" role='menuitem' class='selected'>
          Popularité
        </div>
      
        <div role='menu' aria-expanded="false" aria-haspopup='true' class='options-container'>
      
          <div tabindex='-1' role='none' class='radio-wrapper'>
            <input role='menuitem' value='popularity' type='radio' class='radio' id='popularity' name='category'>
            <label for='popularity'>Popularité</label>
          </div>
      
          <hr role='separator' class="rounded">
      
          <div tabindex='-1' role='none' class='radio-wrapper'>
            <input role='menuitem' value='title' type='radio' class='radio' id='title' name='category'>
            <label for='title'>Titre</label>
          </div>
          
          <hr role='separator' class="rounded">
      
          <div tabindex='-1' role='none' class='radio-wrapper'>
            <input role='menuitem' value='date' type='radio' class='radio' id='date' name='category'>
            <label for='date'>Date</label>
          </div>
      
        </div>
      </div>`);

    const selected = sortingFragment.querySelector('.selected');
    const optionsContainer = sortingFragment.querySelector('.options-container');  
    const optionsList = sortingFragment.querySelectorAll('.radio-wrapper');

    selected.addEventListener('click', () => toggleSortingMenu() );
    selected.addEventListener('keydown', (event) => { if(event.key === 'Enter' || event.key === 'ArrowDown') toggleSortingMenu(); } );

    optionsList.forEach(option => {
      option.addEventListener('mousedown', () => { processOption(option); });
      option.addEventListener('keydown', (event) => { if(event.key === 'Enter') { processOption(option); } });
    });

    const processOption = (option) => {
      let optionValue = option.querySelector("input").value;
      selected.innerHTML = option.querySelector('label').innerHTML;
      let sortedMedias = sortingMediasBy(optionValue);

      console.log(`Sorting by ${optionValue}:`, sortedMedias.map(media => ({ [optionValue]: media[optionValue === 'popularity' ? 'likes' : optionValue] })));

      updateMedias(sortedMedias);
      toggleSortingMenu();
    };

    const sortingMediasBy = (option = 'popularity') => {
      let medias = Data.getMediasByPhotographerId();

      switch (option) {
        case 'popularity': return medias.sort((a, b) => b.likes - a.likes);
        case 'title': return medias.sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
        case 'date': return medias.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      }
    };

    const toggleSortingMenu = () => {
      optionsContainer.classList.toggle('active');
      optionsContainer.setAttribute('aria-expanded', optionsContainer.ariaExpanded === 'true' ? 'false' : 'true');
      optionsList.forEach(option => {
        option.setAttribute('tabindex', option.getAttribute('tabindex') == '0' ? '-1' : '0');
      });
    };

    return sortingFragment;
  };

  return { title, likes, date, getSortingDOM }
};