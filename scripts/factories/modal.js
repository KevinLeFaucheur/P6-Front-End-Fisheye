export const displayModal = () => {
  document.getElementById('contact_modal').style.display = 'block';
  document.getElementById('body').classList.add('no-scroll'); 
  document.getElementById('main').ariaHidden = 'true';
  document.getElementById('header').ariaHidden = 'true';
  document.getElementById('modal__form').addEventListener('submit', (event) => { validate(event); } );
};

const closeModal = () => {
  document.getElementById('contact_modal').style.display = 'none';
  document.getElementById('body').classList.remove('no-scroll');
  document.getElementById('main').ariaHidden = 'false';
  document.getElementById('header').ariaHidden = 'false';
};

export const modalForm = (name) => {
  
  const getModalDOM = () => {

    return document.createRange().createContextualFragment(
      `<div id="contact_modal">
        <div class="modal" role="dialog" aria-describedby="modalTitle">
          <header id="modal__header">
            <h2 id="modalTitle">Contactez-moi ${name}</h2>
            <img src="assets/icons/close.svg" onclick="closeModal()"/>
          </header>
          <form id="modal__form" name="contact-form" action="" method="post">
            <div>
              <label for="first-name">Prénom</label>
              <input id="first-name" aria-labelledby="First Name" name="first-name""/>
            </div>

            <div>
              <label for="last-name">Nom</label>
              <input id="last-name" aria-labelledby="Last Name" name="last-name"/>
            </div>

            <div>
              <label for="email">Email</label>
              <input id="email" aria-labelledby="Email" name="email"/>
            </div>

            <div>
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
    id: 'first-name',
    errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    validation: function() {
      return /^[a-z][a-z]+$/i.test(this.element.value.trim());
    }
  },
  {
    id: 'last-name',
    errorMessage: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    validation: function() {
      return /^[a-z][a-z]+$/i.test(this.element.value.trim());
    }
  },
  {
      id: 'email',
      errorMessage: 'Veuillez entrer une adresse mail valide.',
      validation: function() {
          return /^[\w]+@[\w]+\.[\w]+$/.test(this.element.value);
      }
  },
  {
      id: 'message',
      errorMessage: 'Veuillez entrer 2 caractères ou plus pour votre message.',
      validation: function() {
          return /^[\w][\w]+$/i.test(this.element.value);
      }
  }
];

const validate = (event) => {
  event.preventDefault();
  let valid = true;
  form.forEach(object => {
    object = { ...object, element : document.getElementById(object.id) };
    if(!object.validation()) { 
      showError(object.element, object.errorMessage);
      valid = false; 
    } else clearError(object.element);
  });
  
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

const error = () => {
    let newError = document.createElement('small');
    newError.classList.add('error');
    return newError;
};

const showError = (element, errorMessage) => {    
    if(element.parentElement.getElementsByClassName('error').length == 0) {
        element.parentElement.appendChild(error()).textContent = errorMessage;
        element.style.borderColor = "red";
    }
};

const clearError = (element) => {   
    if(element.parentElement.getElementsByClassName('error').length > 0) {
        element.parentElement.querySelector('.error').remove();
        element.style.borderColor = "black";
    }
};