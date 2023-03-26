function toggleMenu() {
  var menu = document.querySelector(".menu");
  menu.classList.toggle("show");
}

document.addEventListener("click", function(event) {
  var menu = document.querySelector(".menu");
  if (event.target.closest(".menu-container") === null && menu.classList.contains("show")) {
    menu.classList.remove("show");
  }
});
