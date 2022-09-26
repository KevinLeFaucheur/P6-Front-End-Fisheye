async function getPhotographers() {

    const request = './data/photographers.json';
    const photographers = await fetch(request)
                                .then(response => {
                                    if(response.ok) {
                                        return response.json();
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                });    
    return ( photographers );
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
          
    // const photographerLinks = document.getElementsByClassName("photographer_section__link");
    // for (const link of photographerLinks) {
    //     link.addEventListener('click', () => {
    //         console.log(photographers.filter(obj => { return obj.id == link.parentElement.id }));
    //     });
    // }
};

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();