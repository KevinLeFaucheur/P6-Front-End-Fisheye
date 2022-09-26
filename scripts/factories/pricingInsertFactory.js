export const pricingInsertFactory = (data) => {
    const { name, id, city, country, tagline, price, portrait } = data;

    const getInsertDOM = () => {

        return document.createRange().createContextualFragment(
                            `<aside id="pricing-insert">
                                <div id="pricing-insert__likes">999 999♥</div>
                                <div id="pricing-insert__price">${price}€/jour</div>
                            </aside>`);
    };

    return { name, id, city, country, tagline, price, portrait, getInsertDOM }
};