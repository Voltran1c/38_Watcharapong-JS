let products = [];
let cart = [];
let productId = 1;
const defaultImageUrl = "imges/logo.jpg";

function addProduct() {
  event.preventDefault();

  const productName = document.querySelector("#productName").value;
  const productPrice = document.querySelector("#productPrice").value;
  const productImage =
    document.querySelector("#imageUrl").value || defaultImageUrl;

  if (validateProduct(productName, productPrice, productImage)) {
    const product = {
      id: productId++,
      name: productName,
      price: productPrice,
      image: productImage,
    };

    products.push(product);
    renderProduct(product);
    document.querySelector("#productForm").reset();
  } else {
    alert("Please fill in all product details (Name, Price, Image).");
  }
}

function validateProduct(productName, productPrice, productImage) {
  const trimmedName = productName.trim();
  return trimmedName && productPrice && productImage;
}

function renderProduct(product) {
  const productList = document.querySelector("#productList");

  const productItem = document.createElement("div");
  productItem.className =
    "p-4 bg-gray rounded-lg shadow-md flex items-center space-x-4";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-checkbox h-5 w-5 accent-gray-600";
  checkbox.dataset.productId = product.id;
  checkbox.addEventListener("change", updateCart);

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.className = "w-16 h-16 object-cover rounded-lg";

  const productDetails = document.createElement("div");
  productDetails.className = "flex-1";

  const productNameElement = document.createElement("h3");
  productNameElement.className = "text-lg font-semibold";
  productNameElement.textContent = product.name;

  const productPriceElement = document.createElement("p");
  productPriceElement.className = "text-gray-500";
  productPriceElement.textContent = `$${product.price}`; // Access price property

  productDetails.appendChild(productNameElement);
  productDetails.appendChild(productPriceElement);

  productItem.appendChild(checkbox);
  productItem.appendChild(img);
  productItem.appendChild(productDetails);

  productList.appendChild(productItem);
}

function updateCart() {
  const checkedProductIds = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.dataset.productId);

  cart = products.filter((product) => checkedProductIds.includes(product.id));
  updateTotalValue();
}

document.getElementById("cartButton").addEventListener("click", updateCart);

// function updateTotalValue() {
//   let totalValue = 0;

//   cart.forEach((product) => {
//     totalValue += product.price; // Access price property
//   });

//   const formattedValue = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(totalValue);

//   document.getElementById("totalValue").textContent = formattedValue;
// }

// document.getElementById("calculateButton").addEventListener("click", () => {});
