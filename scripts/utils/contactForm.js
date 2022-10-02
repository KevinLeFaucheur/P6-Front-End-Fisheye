const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};

const modalFactory = (name) => {
  
  const getModalDOM = () => {

    return document.createRange().createContextualFragment(
      `<div id="contact_modal">
        <div class="modal" role="dialog" aria-labelledby="dialogHeader" aria-describedby="dialogHeader">
          <header id="modal__header">
            <h2 id="dialogHeader">Contactez-moi ${name}</h2>
            <img src="assets/icons/close.svg" onclick="closeModal()"/>
          </header>
          <form id="modal__form" name="contact-form" action="" method="post" onsubmit="validate(event); return false;">
            <div>
              <label for="first-name">Prénom</label>
              <input id="first-name" aria-labelledby="First Name" name="first-name""/>

              <label for="last-name">Nom</label>
              <input id="last-name" aria-labelledby="Last Name" name="last-name"/>

              <label for="email">Email</label>
              <input id="email" aria-labelledby="Email" name="email" required/>

              <label for="message">Votre message</label>
              <textarea id="message" aria-labelledby="Your Message" name="message" rows="8"></textarea>
            </div>
            <button class="contact_button" type="submit">Envoyer</button>
          </form>
        </div>
      </div>`);
  };

  return { getModalDOM }
};

const form = [
  {
    element: document.getElementById('first-name'),
    errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    validation: function() {
      return /^[a-z][a-z]+$/i.test(this.element.value.trim());
    }
  },
  {
    element: document.getElementById('last-name'),
    errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    validation: function() {
      return /^[a-z][a-z]+$/i.test(this.element.value.trim());
    }
  },
  {
      element: document.getElementById('email'),
      errorMessage: 'Veuillez entrer une adresse mail valide.',
      validation: function() {
          return /^[\w]+@[\w]+\.[\w]+$/.test(this.element.value);
      }
  }
];

let valid = true;
const validate = (event) => {
  // form.forEach(element => {
  //   // if(!element.validation()) { 
  //   //   console.log(element.errorMessage);
  //   //   valid = false; 
  //   // }
  //   console.log(element);
  // });

  if(valid) {
    showValidationMessage();
    showCloseButton();
  }
};

const showValidationMessage = () => {
  const validationMessage = document.createElement('div');
  validationMessage.classList.add('modal__validation');
  validationMessage.textContent = "Message envoyé !";
  document.querySelector('#modal__form').style.visibility = 'hidden';
  document.querySelector('#modal__header').style.visibility = 'hidden';
  document.querySelector('.modal').appendChild(validationMessage);
};

const showCloseButton = () => {
    const closeValidationButton = document.createElement('button');
    closeValidationButton.textContent = "Fermer";
    closeValidationButton.classList.add('contact_button');
    closeValidationButton.addEventListener("click", closeModal);
    document.querySelector('.modal').appendChild(closeValidationButton);
};