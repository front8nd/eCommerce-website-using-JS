const fetchAPI = async () => {
  let url = new URL(window.location.href);
  let id = url.searchParams.get("id");

  let res = await fetch(`https://dummyjson.com/products/${id}`);
  let data = await res.json();
  console.log(data);

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
  document.querySelector(".category-badge").innerText =
    data.category.toUpperCase();
  document.querySelector(".Product-desc").innerHTML = `${data.description}.`;
  document.querySelector(".Product-price").innerText = `$ ${data.price}`;

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
  document.querySelector(".dropdown-item").remove();
  document.querySelector(".mobile-item").remove();
};

fetchAPI();

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

document.addEventListener("DOMContentLoaded", () => {
  let mainImage = document.querySelector(".main-img");
  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("sub-img")) {
      mainImage.src = event.target.src;
    }
  });
});
