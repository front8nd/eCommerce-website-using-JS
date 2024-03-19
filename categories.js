const API = "https://dummyjson.com/products/?limit=8";
const categoryAPI = "https://dummyjson.com/products/categories";

const fetchAPI = async () => {
  // fetch products
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");
  document.querySelector("title").textContent = id.toUpperCase();

  console.log(id);
  let res = await fetch(`https://dummyjson.com/products/category/${id}`);
  let DATA = await res.json();
  let fetchProudcts = DATA.products;
  // FETCHING PRODUCTS
  fetchProudcts.map((product) => {
    let card = document.querySelector(".col").cloneNode(true);
    card.classList.remove("hide");
    card.querySelector(".card-img-top").setAttribute("src", product.images[0]);
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
    ).innerHTML = `<i class="fas fa-star"></i> ${product.rating}`;
    card.querySelector(
      ".reviews-badge"
    ).innerHTML = `<i class="fa-solid fa-comment"></i>${product.stock}`;
    card.querySelector(".price-badge").innerText = `$ ${product.price}`;

    document.querySelector(".row").appendChild(card);
  });
  document.querySelector(".col").remove();

  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".con").style.height = 0;

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
};

function handleSubmit(event) {
  event.preventDefault();

  const searchQuery = document.querySelector(".search-input").value.trim();
  console.log(searchQuery);
  if (searchQuery !== "") {
    const url = `results.html?query=${encodeURIComponent(searchQuery)}`;
    window.location.href = url;
  } else {
    alert("Please enter a search query");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search-form")
    .addEventListener("submit", handleSubmit);
});
fetchAPI();
// document.addEventListener("DOMContentLoaded", () => {
//   fetchAPI();
// });
