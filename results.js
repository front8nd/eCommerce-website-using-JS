let API = "https://dummyjson.com/products/search?q=";
const categoryAPI = "https://dummyjson.com/products/categories";

const nextPage = document.querySelector(".nextPage");
//const PrevPage = document.querySelector(".PrevPage");

let url = new URLSearchParams(window.location.search);
let searchQuery = new URLSearchParams(window.location.search);
let getQuery = url.get("query");
let pageNum = url.get("page");
let page = 1;
const loadPosts = async () => {
  let postsPerPage = 8;
  let skip = (page - 1) * postsPerPage;
  const paginationAPI = `https://dummyjson.com/products?limit=${postsPerPage}&skip=${skip}`;
  console.log(paginationAPI);

  let res = await fetch(paginationAPI);
  let DATA = await res.json();
  let fetchProudcts = DATA.products;
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
  page = page + 1;
  console.log(page);
};
const loadMore = () => {
  loadPosts();
};

nextPage.addEventListener("click", loadMore);
let fetchAPI = async () => {
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
  // Get the search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");

  if (searchQuery) {
    // Fetch products based on search query
    const res = await fetch(`${API}${searchQuery}`);
    const DATA = await res.json();
    const fetchProducts = DATA.products;
    console.log(searchQuery);
    // Display search results
    fetchProducts.forEach((product) => {
      let card = document.querySelector(".col").cloneNode(true);
      card.classList.remove("hide");
      card
        .querySelector(".card-img-top")
        .setAttribute("src", product.images[0]);
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
  } else {
    // Handle case when no search query is provided
    console.log("No search query provided.");
  }
  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".con").style.height = 0;
  document.querySelector(".pageContainer").classList.remove("d-none");
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
