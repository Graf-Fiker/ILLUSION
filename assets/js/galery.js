const galleryItems = document.querySelectorAll('.gallery-item');
const popup = document.querySelector('.popup');
const popupImg = popup.querySelector('img');
const closeBtn = popup.querySelector('.close-btn');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    popupImg.src = item.querySelector('img').src;
    popup.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});
