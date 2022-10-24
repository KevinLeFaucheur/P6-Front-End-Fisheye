const body = document.getElementById('body');
const main = document.getElementById('main');
const header = document.getElementById('header');
const contactButton = document.getElementById('contact_button');

export const displayModal = () => {
  const modal = document.getElementById('contact_modal');
  body.classList.add('no-scroll'); 
  main.ariaHidden = 'true';
  header.ariaHidden = 'true';
  contactButton.style.display = 'none';

  modalOnlyFocus(modal);

  modal.style.display = 'block';
  document
    .querySelectorAll('article > img, article > video, header > a, .selected, .photographer-medias__like')
    .forEach(element => element.setAttribute('tabindex', '-1'));

  document.getElementById('modal__close').focus();
};

const closeModal = () => {
  body.classList.remove('no-scroll');
  main.ariaHidden = 'false';
  header.ariaHidden = 'false';

  document.getElementById('contact_modal').style.display = 'none';
  document
    .querySelectorAll('article > img, article > video, header > a, .selected, .photographer-medias__like')
    .forEach(element =>  element.setAttribute('tabindex', '0'));

  contactButton.style.display = 'block';
  contactButton.focus();
};

export const modalForm = (name) => {
  
  const getModalDOM = () => {

    const modalFragment = document.createRange().createContextualFragment(
      `<div id="contact_modal">
        <div class="modal" role="dialog" aria-labelledby="modalTitle">
          <header id="modal__header">
            <h2 id="modalTitle">Contactez-moi</br> ${name}</h2>
            <img 
              tabindex='0' 
              role='button' 
              alt='Close contact form' 
              aria-label='Close contact form' 
              id='modal__close' 
              src="assets/icons/close.svg"/>
          </header>
          <form id="modal__form" name="contact-form" action="" method="post">
            <div class='modal__input-wrapper'>
              <label for="first-name">Prénom</label>
              <input type='text' id="first-name" name="first-name""/>
            </div>

            <div class='modal__input-wrapper'>
              <label for="last-name">Nom</label>
              <input type='text' id="last-name" name="last-name"/>
            </div>

            <div class='modal__input-wrapper'>
              <label for="email">Email</label>
              <input type='text' id="email" name="email"/>
            </div>

            <div class='modal__input-wrapper'>
              <label for="message">Votre message</label>
              <textarea id="message" aria-multiline="true" name="message" rows="4"></textarea>
            </div>
            <button id='submit_button' class="contact_button" type="submit">Envoyer</button>
          </form>
        </div>
      </div>`);

    modalFragment
      .getElementById('modal__close')
      .addEventListener('click', closeModal);

    modalFragment
      .getElementById('modal__close')
      .addEventListener('keydown', (event) => { 
        if(event.key === 'Enter') {
          closeModal(); 
          event.preventDefault();
        }
    });

    modalFragment
      .getElementById('contact_modal')
      .addEventListener('keydown', (event) => { 
        if(event.key === 'Escape') closeModal(); 
    });

    modalFragment
      .getElementById('modal__form')
      .addEventListener('submit', (event) => { 
        validate(event); 
    });

    return modalFragment;
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
    console.log('----Message Envoyé!----');
    form.forEach(object => { console.log(document.getElementById(object.id).value); });
    console.log('-----------------------');
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
    closeValidationButton.addEventListener('keydown', (event) => { 
      if(event.key === 'Enter') {
        closeModal(); 
        event.preventDefault();
      }
    });
    document.querySelector('.modal').appendChild(closeValidationButton);
    closeValidationButton.focus();
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

const modalOnlyFocus = (modalFragment) => {
  const focusableElements = modalFragment.querySelectorAll('#modal__close, input, textarea, #submit_button');
  const firstFocusable = focusableElements[0];  
  const lastFocusable = focusableElements[focusableElements.length - 1];

  modalFragment.addEventListener('keydown', (event) => {
    if (!(event.key === 'Tab' || event.keyCode === 9)) return;

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  });
}