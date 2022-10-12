import { updateMedias } from "../pages/photographer.js";

export const sorting = (data) => {
  const { title, likes, date } = data;

  const getSortingDOM = () => {
    const sortingFragment = document.createElement('section');
    sortingFragment.classList.add('photographer-sorting');

    const sortingSelect = 
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
    
    </div>`;

    const sortingNode = document.createRange().createContextualFragment(sortingSelect);

    sortingFragment.appendChild(sortingNode);

    const selected = sortingFragment.querySelector('.selected');
    const optionsContainer = sortingFragment.querySelector('.options-container');  
    const optionsList = sortingFragment.querySelectorAll('.radio-wrapper');

    selected.addEventListener('click', () => togglePopup() );
    selected.addEventListener('keydown', (event) => { if(event.key === 'Enter' || event.key === 'ArrowDown') togglePopup(); } );

    optionsList.forEach(option => {
      option.addEventListener('mousedown', () => {
        selected.innerHTML = option.querySelector('label').innerHTML;
        updateMedias(option.querySelector("input").value);
        togglePopup();
      });

      option.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
          selected.innerHTML = option.querySelector('label').innerHTML;
          updateMedias(option.querySelector("input").value);
          togglePopup();
        } 
      });
    });

    const togglePopup = () => {
      optionsContainer.classList.toggle('active');
      optionsContainer.setAttribute('aria-expanded', optionsContainer.ariaExpanded === 'true' ? 'false' : 'true');
      optionsList.forEach(option => {
        option.setAttribute('tabindex', option.getAttribute('tabindex') == '0' ? '-1' : '0');
      });

      if(optionsContainer.ariaExpanded) {
        optionsList[0].focus();
      } else selected.focus();

    };

    return sortingFragment;
  };

  return { title, likes, date, getSortingDOM }
};