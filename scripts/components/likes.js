export const addLike = (imageId, likeCount) => {
  document.getElementById(imageId).innerHTML = ++likeCount + ' <span class="media-section__like fa-solid fa-heart"></span>';
  updateTotalLikes();
};

export const getTotalLikes = () => {
  let totalLikes = 0;
  document.querySelectorAll('.likes').forEach(element => totalLikes += parseInt(element.textContent));
  return totalLikes;
};

export const updateTotalLikes = () => {
  document.getElementById('pricing-insert__likes').innerHTML = `${getTotalLikes()} <span class="fa-solid fa-heart"></span>`;
};