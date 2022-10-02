export const pricingInsertFactory = (data, likes) => {
  const { price } = data;

  const getInsertDOM = () => {

  return document.createRange().createContextualFragment(
    `<aside id="pricing-insert" class="hideable">
        <div id="pricing-insert__likes">${likes} <i class="fa-solid fa-heart"></i></div>
        <div id="pricing-insert__price">${price}€/jour</div>
    </aside>`);
  };

  return { price, likes, getInsertDOM }
};