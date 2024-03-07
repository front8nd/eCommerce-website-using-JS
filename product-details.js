// IMAGE SELECTOR
document.addEventListener("DOMContentLoaded", () => {
  let mainImage = document.querySelector(".main-img");
  let subImage = document.querySelectorAll(".sub-img");
  subImage.forEach((e) => {
    e.addEventListener("mouseover", () => {
      mainImage.src = e.src;
    });
  });
});

// QUANITITY CHANGER
document.addEventListener("DOMContentLoaded", () => {
  let increaseBtn = document.querySelector("#increaseBtn");
  let decreaseBtn = document.querySelector("#decreaseBtn");
  let quantityInput = document.querySelector("#quantityInput");
  if (increaseBtn && decreaseBtn && quantityInput) {
    increaseBtn.addEventListener("click", () => {
      if (Number(quantityInput.value) >= 9) {
        quantityInput.value = 9;
        document.querySelector(".max-pro").classList.remove("hide");
      } else quantityInput.value = Number(quantityInput.value) + 1;
    });
    decreaseBtn.addEventListener("click", () => {
      document.querySelector(".max-pro").classList.add("hide");

      if (Number(quantityInput.value) <= 1) {
        quantityInput.value = 1;
      } else quantityInput.value = Number(quantityInput.value) - 1;
    });
  }
});

const fetchAPI = async () => {
  // fetch products
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");

  let res = await fetch(`https://fakestoreapi.com/products/${id}`);
  let data = await res.json();
  console.log(data);

  document.querySelector(".main-img").setAttribute("src", data.image);
  document.querySelector(".sub-img").setAttribute("src", data.image);

  document.querySelector(".Product-title").innerText = data.title;
  document.querySelector(".category-badge").innerText =
    data.category.toUpperCase();
  document.querySelector(".Product-desc").innerHTML = `${data.description}.`;
  document.querySelector(".Product-price").innerText = `$ ${data.price}`;
  /* clone node without parent in html
    we dont need it here, bcoz we are not replicating products unlike homepage
  */
  // let productContainer = document.querySelector(".product-container");
  // let div = productContainer.cloneNode(true);
  // div.querySelector(".Product-title").innerText = data.title;
  // div.querySelector(".category-badge").innerText = data.category.toUpperCase();
  // div.querySelector(".Product-desc").innerText = `${data.description}.`;
  // div.querySelector(".Product-price").innerText = `$ ${data.price}`;

  // // Append the cloned div to the parent of the original node
  // productContainer.parentNode.appendChild(div);

  // // Now remove the original node
  // productContainer.remove();
  // fetch categories for menu
  const categoryAPI = "https://fakestoreapi.com/products/categories";
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

fetchAPI();
