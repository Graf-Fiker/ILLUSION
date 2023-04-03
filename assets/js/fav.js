function toggleMenu() {
  var menu = document.querySelector(".menu");
  menu.classList.toggle("show");
  if (menu.classList.contains("show")) {
    menu.style.display = "block";
    menu.style.opacity = "0";
    setTimeout(function() {
      menu.style.opacity = "1";
    }, 10);
  } else {
    menu.style.opacity = "0";
    setTimeout(function() {
      menu.style.display = "none";
    }, 500);
  }
}

document.addEventListener("click", function(event) {
  var menu = document.querySelector(".menu");
  if (event.target.closest(".menu-container") === null && menu.classList.contains("show")) {
    menu.classList.remove("show");
    menu.style.opacity = "0";
    setTimeout(function() {
      menu.style.display = "none";
    }, 500);
  }
});
