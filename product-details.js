const fetchAPI = async () => {
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");

  let res = await fetch(`https://dummyjson.com/products/${id}`);
  let data = await res.json();
  // product data
  data.images.map((imageUrl) => {
    const subImgGroupClone = document
      .querySelector(".Sub-Image")
      .cloneNode(true);
    subImgGroupClone.querySelector(".sub-img").setAttribute("src", imageUrl);
    document.querySelector(".Sub-Image-Group").appendChild(subImgGroupClone);
  });
  document.querySelector(".Sub-Image").remove();
  document.querySelector(".main-img").setAttribute("src", data.images[0]);

  document.querySelector(".Product-title").innerText = data.title;
  document.querySelector("title").textContent = data.title;
  document.querySelector(".category-badge").innerText =
    data.category.toUpperCase();
  document.querySelector(".Product-desc").innerHTML = `${data.description}.`;
  document.querySelector(".Product-price").innerText = `$ ${data.price}`;

  // category
  const categoryAPI = "https://dummyjson.com/products/categories";
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

  //removing dummy classes
  document.querySelector(".dropdown-item").remove();
  document.querySelector(".mobile-item").remove();
  document.querySelector(".loader").classList.add("hide");
  document.querySelector(".con").style.height = 0;
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAPI();
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
//image switcher
document.addEventListener("DOMContentLoaded", () => {
  let mainImage = document.querySelector(".main-img");
  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("sub-img")) {
      mainImage.src = event.target.src;
    }
  });
});
// search function
function handleSubmit(event) {
  event.preventDefault();

  const searchQuery = document.querySelector(".search-input").value.trim();

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

// add to cart
const addCartBtn = document.querySelector(".addCart");
const handleCartSubmit = (event) => {
  event.preventDefault();
  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "BMW Pencil",
      /* other product data */
    }),
  })
    .then((res) => res.json())
    .then(console.log);
};

addCartBtn.addEventListener("click", handleCartSubmit);
