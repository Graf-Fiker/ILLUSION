const images = document.querySelectorAll('.gallery-image');
const gallery = document.querySelector('.gallery');

let currentImageIndex;

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentImageIndex = index;
    gallery.classList.add('fullscreen');
    showFullscreenImage();
  });
});

function showFullscreenImage() {
  const fullscreenImage = document.createElement('img');
  fullscreenImage.src = images[currentImageIndex].src;
  fullscreenImage.alt = images[currentImageIndex].alt;
  fullscreenImage.classList.add('fullscreen-image');
  gallery.appendChild(fullscreenImage);

  const prevButton = document.createElement('span');
  prevButton.innerHTML = '&larr;';
  prevButton.classList.add('prev-button');
  prevButton.addEventListener('click', showPreviousImage);
  gallery.appendChild(prevButton);

  const nextButton = document.createElement('span');
  nextButton.innerHTML = '&rarr;';
  nextButton.classList.add('next-button');
  nextButton.addEventListener('click', showNextImage);
  gallery.appendChild(nextButton);

  fullscreenImage.addEventListener('click', () => {
    gallery.classList.remove('fullscreen');
    fullscreenImage.remove();
    prevButton.remove();
    nextButton.remove();
  });
}

function showNextImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  const fullscreenImage = document.querySelector('.fullscreen-image');
  fullscreenImage.src = images[currentImageIndex].src;
  fullscreenImage.alt = images[currentImageIndex].alt;
}

function showPreviousImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  const fullscreenImage = document.querySelector('.fullscreen-image');
  fullscreenImage.src = images[currentImageIndex].src;
  fullscreenImage.alt = images[currentImageIndex].alt;
}
