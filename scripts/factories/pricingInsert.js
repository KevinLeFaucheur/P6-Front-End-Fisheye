export const pricingInsert = (data, likes) => {
  const { price } = data;

  const getInsertDOM = () => {

  return document.createRange().createContextualFragment(
    `<aside id="pricing-insert" class="hideable">
        <div id="pricing-insert__likes">${likes} <span class="fa-solid fa-heart"></span></div>
        <div id="pricing-insert__price">${price}€/jour</div>
    </aside>`);
  };

  return { price, likes, getInsertDOM }
};