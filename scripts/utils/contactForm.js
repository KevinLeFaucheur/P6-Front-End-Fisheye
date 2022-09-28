const displayModal = () => {
    const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
};

const closeModal= () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
};

const modalFactory = (name) => {
  
    const getModalDOM = () => {
  
      return document.createRange().createContextualFragment(
            `<div id="contact_modal">
              <div role="dialog" aria-labelledby="dialogHeader" aria-describedby="dialogHeader" class="modal">
                <header>
                  <h2 id="dialogHeader">Contactez-moi ${name}</h2>
                  <img src="assets/icons/close.svg" onclick="closeModal()"/>
                </header>
                <form name="" action="photgrapher.html" method="post" onsubmit="return false">
                  <div>
                    <label for="first-name">Prénom</label>
                    <input aria-labelledby="First Name" name="first-name" id="first-name"/>

                    <label for="last-name">Nom</label>
                    <input aria-labelledby="Last Name" name="last-name" id="first-name"/>

                    <label for="email">Email</label>
                    <input aria-labelledby="Email" name="email" id="email" required/>

                    <label for="message">Votre message</label>
                    <textarea aria-labelledby="Your Message" name="message" id="message" rows="8"></textarea>
                  </div>
                  <button class="contact_button">Envoyer</button>
                </form>
              </div>
            </div>`);
    };
  
    return { getModalDOM }
  };