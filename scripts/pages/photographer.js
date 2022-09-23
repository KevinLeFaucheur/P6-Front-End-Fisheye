//Mettre le code JavaScript lié à la page photographer.html
import { photographerHeaderFactory } from "../factories/photographerHeaderFactory.js";

async function getPhotographers() {

    const request = '../data/photographers.json';
    console.log(request);
    const photographers = await fetch(request)
                                .then(response => {
                                    if(response.ok) {
                                        return response.json();
                                    }
                                })
                                .catch(error => {
                                    // 
                                });    
    return ( photographers );
}

const photographersData = await getPhotographers();
const params = new URLSearchParams(window.location.search);
const idParam = params.get('id');
console.log(idParam);
let photographerData = photographersData.photographers.filter(object => object.id == idParam)[0];
console.log(photographerData);

async function displayHeaderData() {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerHeaderData = photographerHeaderFactory(photographerData);
    console.log(photographerHeaderData);

    const photographerHeaderDOM = photographerHeaderData.getHeaderDOM();

    photographerHeader.appendChild(photographerHeaderDOM);

}

displayHeaderData();