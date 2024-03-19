// fetch categories for menu
let fetchCat = async () => {
  let categoryAPI = "https://dummyjson.com/products/categories";
  const resCAT = await fetch(categoryAPI);
  let DATACAT = await resCAT.json();

  DATACAT.map((category) => {
    let menu = document.querySelector(".dropdown-item").cloneNode(true);
    menu.innerText = category.toUpperCase();
    menu.setAttribute("href", `categories.html?id=${category}`);
    document.querySelector(".dropdown-menu").appendChild(menu);

    let menuMobile = document.querySelector(".mobile-item").cloneNode(true);
    menuMobile.innerText = category.toUpperCase();
    menuMobile.setAttribute("href", `categories.html?id=${category}`);
    document.querySelector(".mobile-menu").appendChild(menuMobile);
  });
  document.querySelector(".dropdown-item").remove();
  document.querySelector(".mobile-item").remove();

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".con").style.height = 0;
};

const fetchCart = async () => {
  fetch("https://dummyjson.com/carts/1")
    .then((res) => res.json())
    .then(console.log);
};

//load API's
document.addEventListener("DOMContentLoaded", () => {
  fetchCat();
  fetchCart();
});
