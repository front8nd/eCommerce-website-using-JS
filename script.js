const API = "https://fakestoreapi.com/products";
const categoryAPI = "https://fakestoreapi.com/products/categories";

const fetchAPI = async () => {
  // fetch products
  const res = await fetch(API);
  let DATA = await res.json();
  // fetch categories for menu
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

  // FETCHING PRODUCTS
  DATA.map((product) => {
    let card = document.querySelector(".col").cloneNode(true);
    card.classList.remove("hide");
    card.querySelector(".card-img-top").setAttribute("src", product.image);
    let title = product.title;
    if (title.length > 24) {
      title = title.substring(0, 24) + "...";
    }
    card.querySelector(".product-title").innerText = title;
    card
      .querySelector(".product-title")
      .setAttribute("href", `product-details.html?id=${product.id}`);

    card.querySelector(".check-details").addEventListener("click", () => {
      window.location.href = `product-details.html?id=${product.id}`;
    });

    card.querySelector(
      ".category-badge"
    ).innerHTML = `<i class="fas fa-tag"></i>${product.category.toUpperCase()}`;
    card.querySelector(
      ".ratings-badge"
    ).innerHTML = `<i class="fas fa-star"></i> ${product.rating.rate}`;
    card.querySelector(
      ".reviews-badge"
    ).innerHTML = `<i class="fa-solid fa-comment"></i>${product.rating.count}`;
    card.querySelector(".price-badge").innerText = `$ ${product.price}`;

    document.querySelector(".row").appendChild(card);
  });
  document.querySelector(".col").remove();
};
fetchAPI();
// document.addEventListener("DOMContentLoaded", () => {
//   fetchAPI();
// });
