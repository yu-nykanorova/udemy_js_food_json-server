function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const currentSlide = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
  
    let slideIndex = 1;
    let offset = 0;
  
    // showSlides(slideIndex);
  
    // function showSlides(n) {
    //   if(n > slides.length) {
    //     slideIndex = 1;
    //   }
      
    //   if (n < 1) {
    //     slideIndex = slides.length;
    //   }
  
    //   slides.forEach(slide => slide.style.display = "none");
    //   slides[slideIndex - 1].style.display = "block";
  
    //   if (slideIndex < 10) {
    //     currentSlide.textContent = `0${slideIndex}`;
    //   } else {
    //     currentSlide.textContent = slideIndex;
    //   }
    // }
  
    // function plusSlides(n) {
    //   showSlides(slideIndex += n);
    // }
    
    // prev.addEventListener("click", () => {
    //   plusSlides(-1);
      
    // });
    
    // next.addEventListener("click", () => {
    //   plusSlides(1);
    // });
  
    function addZero(length, current, total) {
        if (length < 10) {
        total.textContent = `0${length}`;
        current.textContent = `0${slideIndex}`;
        } else {
        total.textContent = length;
        current.textContent = slideIndex;
        }
    }
  
    addZero(slides.length, currentSlide, total);  
  
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
  
    slidesWrapper.style.overflow = "hidden";
  
    slides.forEach(slide => {
        slide.style.width = width;
    });
  
    slider.style.position = "relative";
  
    const indicators = document.createElement("ol");
    const dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);
  
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        if (i == 0) {
            dot.style.opacity = 1;
        } 
        indicators.append(dot);
        dots.push(dot);
    }
  
    function changeDotsOpacity(dots) {
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[slideIndex - 1].style.opacity = 1;
    }
  
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, "");
    }
  
    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
      slidesField.style.transform = `translateX(-${offset}px)`;
  
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
      
      addZero(slides.length, currentSlide, total);
  
      changeDotsOpacity(dots);
      
    });
  
    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
      
      addZero(slides.length, currentSlide, total);
  
      changeDotsOpacity(dots);
  
    });
  
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
  
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
  
            slidesField.style.transform = `translateX(-${offset}px)`;
  
            addZero(slides.length, currentSlide, total);
  
            changeDotsOpacity(dots);
        });
    });
}


export default slider;