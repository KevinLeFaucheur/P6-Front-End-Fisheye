export const sortingFactory = (data) => {
  const { title, likes, date } = data;

  const getSortingDOM = () => {
    const sortingFragment = document.createElement('section');
    sortingFragment.classList.add('photographer-sorting');

    const sortingSelect = 
      `
      <label for='sorting-select'>Trier par</label>
      <select name='sorting-select' class='sorting-select'>
          <option value='popularity'>Popularité</option>
          <option value='date'>Date</option>
          <option value='title'>Titre</option>
      </select>`;

    // const sortingSelect = 
    //   `
    //   <label for='sorting-select'>Trier par</label>
    //   <selectmenu name='sorting-select' class='sorting-select'>
    //     <button slot='button' behavior='button'>
    //       <labe/>test</label>
    //     </button>
    //     <div slot='listbox' behavior='listbox'>
    //       <option value='popularity'>Popularité</option>
    //       <option value='date'>Date</option>
    //       <option value='title'>Titre</option>
    //     </div>
    //   </selectmenu>`;

    const sortingNode = document.createRange().createContextualFragment(sortingSelect)
    sortingFragment.appendChild(sortingNode);
    // sortingFragment.querySelector('.sorting-select').addEventListener('change', event => {
    //     const option = event.target.value;
    //     sortingMediasBy(medias, option);
    // });

    return sortingFragment;
  };

  return { title, likes, date, getSortingDOM }
};