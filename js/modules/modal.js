function modal() {
    const modal = document.querySelector("[data-modal]");
    const modalButtonOpen = document.querySelectorAll("[data-modal-open]");
    const input = document.querySelector(".modal form .modal-input");
    
    function openModal() {
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      clearInterval(modalTimerId);
    }
  
    function closeModal() {
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  
    modalButtonOpen.forEach(btn => {
      btn.addEventListener("click", openModal);
    });
  
    modal.addEventListener("click", event => {
      if (event.target === modal || event.target.getAttribute("data-close") == "") {
        closeModal();
      }
    });
  
    document.addEventListener("keydown", event => {
      if (event.code === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });
  
    const modalTimerId = setTimeout(openModal, 50000);
  
    function showModalByScroll() {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener("scroll", showModalByScroll);
      }
    }
  
    window.addEventListener("scroll", showModalByScroll);
}

export default modal;