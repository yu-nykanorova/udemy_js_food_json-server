import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function callMe(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
  
    const message = {
      loading: "icons/spinner-solid.svg",
      success: "Спасибо! Скоро мы с Вами свяжемся",
      failure: "Что-то пошло не так..."
    };
  
    forms.forEach(item => {
      bindPostData(item);
    });
  
    function bindPostData(form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        let statusMessage = document.createElement("img");
  
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
                  display: block;
                  margin: 10px auto 0;
                  width: 40px;
              `;
  
        form.insertAdjacentElement("afterend", statusMessage);
        
        const formData = new FormData(form);
  
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
        postData("http://localhost:3000/requests", json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });
      });
    }
  
    function showThanksModal(message) {
      const prevModalDialog = document.querySelector(".modal__dialog");
      
      prevModalDialog.classList.add("hide");
      
      openModal("[data-modal]", modalTimerId);
      
      const thanksModal = document.createElement("div");
      
      thanksModal.classList.add("modal__dialog");
      thanksModal.innerHTML = `
              <div class="modal__content">
                  <div class="modal__close" data-close>&times;</div>
                  <div class="modal__title">${message}</div>
              </div>
          `;
  
      document.querySelector("[data-modal]").append(thanksModal);
  
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        closeModal("[data-modal]");
      }, 4000);
    }
}

export default callMe;

// forms "Call me" with XMLHttpRequest

/*const forms = document.querySelectorAll("form");

const message = {
    loading: "icons/spinner-solid.svg",
    success: "Спасибо! Скоро мы с Вами свяжемся",
    failure: "Что-то пошло не так..."
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const statusMessage = document.createElement("img");
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 10px auto 0;
            width: 40px;
        `;
        form.insertAdjacentElement("afterend", statusMessage);

        const request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-type", "application/json");
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            } else {
                showThanksModal(message.failure);
            }
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add("show");
        prevModalDialog.classList.remove("hide");
        closeModal();
    }, 4000);
}*/