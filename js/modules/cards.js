function cards() {
    const menuContainer = document.querySelector(".menu__field .container");
    menuContainer.innerHTML = "";
  
    class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 27;
        this.changeToUAH();
      }
      changeToUAH() {
        this.price = this.price * this.transfer;
      }
      render() {
        const element = document.createElement("div");
        if (this.classes.lenght === 0) {
          this.element = "menu__item";
          element.classList.add(this.element);
        } else {
          this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
                  <img src=${this.src} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.descr}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Цена:</div>
                      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  </div>
              `;
        this.parent.append(element);
      }
    }
  
    const getResource = async (url) => {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
  
      return await res.json();
    }
  
    getResource("http://localhost:3000/menu")
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
          new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
        });
      });
  
    // получение данных и формирование карточек товара по факту без класса
    
    // getResource("http://localhost:3000/menu")
    //   .then(data => createCard(data));
  
    //   function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //       price *= 27;
    //       const element = document.createElement("div");
  
    //       element.classList.add("menu__item");
  
    //       element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //       `;
  
    //       document.querySelector(".menu .container").append(element);
    //     });
    //   }
  
    // получение данных библиотека axios + класс конструктор
  
    // axios.get("http://localhost:3000/menu")
    //   .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {
    //       new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
    //     });
    //   });
}

export default cards;