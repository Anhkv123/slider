const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const slideCount = slides.querySelectorAll('.slide').length;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const prevImage = document.querySelector('.prev-image');
const nextImage = document.querySelector('.next-image');
let currentIndex = 0;

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slideCount - 1;

  if(currentIndex === 0) {
    prevImage.style.opacity = 0.6
    prevImage.style.filter = blur(1)
  }else if (currentIndex === slideCount - 1) {
    nextImage.style.opacity = 0.6
    nextImage.style.filter = blur(1)
  }else{
    prevImage.style.opacity = '1';
    prevImage.style.filter = blur(1)
    nextImage.style.opacity = '1';
    nextImage.style.filter = blur(1)

  }
}

function goToSlide(index) {
  currentIndex = index;
  slides.style.transform = `translateX(-${currentIndex * (900 / slideCount)}%)`;
  updateButtons();
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < slideCount - 1) {
    goToSlide(currentIndex + 1);
  }
});

let dragging = false;
let dragStartX;

slider.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', 'dummy');
  dragging = true;
  dragStartX = event.clientX;
});

slider.addEventListener('dragover', (event) => {
  if (dragging) {
    const offsetX = event.clientX - dragStartX;
    slider.style.transform = `translateX(${offsetX}px)`;
    event.preventDefault();
  }
});
slider.addEventListener('dragend', (event) => {
  dragging = false;
  slider.style.transform = '';

  const offset = dragStartX - event.clientX;
  if (offset > 100 && currentIndex < slideCount - 1) {
    goToSlide(currentIndex + 1);
  } else if (offset < -100 && currentIndex > 0) {
    goToSlide(currentIndex - 1);
  }
});

updateButtons();