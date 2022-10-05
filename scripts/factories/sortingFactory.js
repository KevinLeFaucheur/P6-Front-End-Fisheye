export const sortingFactory = (data) => {
  const { title, likes, date } = data;

  const getSortingDOM = () => {
    const sortingFragment = document.createElement('section');
    sortingFragment.classList.add('photographer-sorting');

    const sortingSelect = 
      `<label for='sorting-select'>Trier par</label>
      <select name='sorting-select' class='sorting-select'>
          <option value='popularity'>Popularité</option>
          <option value='date'>Date</option>
          <option value='title'>Titre</option>
      </select>`;

    const sortingNode = document.createRange().createContextualFragment(sortingSelect)
    sortingFragment.appendChild(sortingNode);

    return sortingFragment;
  };

  return { title, likes, date, getSortingDOM }
};