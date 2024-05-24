let products = [];
let cart = [];
let productId = 1;
const defaultImageUrl = "imges/logo.jpg";

// Add Product
function addProduct() {
  const productName = document.querySelector("#productName").value;
  const productPrice = document.querySelector("#productPrice").value;
  const productImage =
    document.querySelector("#imageUrl").value || defaultImageUrl;

  if (validateProduct(productName, productPrice, productImage)) {
    const product = {
      id: productId++,
      name: productName,
      price: parseFloat(productPrice),
      image: productImage,
      checked: false,
    };

    products.push(product);
    renderProduct(product);
    document.querySelector("#productForm").reset();
  } else {
    alert(
      "Please fill in all product details: Product Name, Price, Image(.jpg or.jpeg)."
    );
  }
}

// validateProduct
function validateProduct(productName, productPrice, productImage) {
  const trimmedName = productName.trim();
  const imageUrlPattern = /\.(jpg|jpeg)$/i;
  return trimmedName && productPrice && imageUrlPattern.test(productImage);
}

// renderProduct
function renderProduct(product) {
  const productList = document.querySelector("#productList");

  const productItem = document.createElement("div");
  productItem.className =
    "p-4 bg-gray rounded-lg shadow-md flex items-center space-x-4";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-checkbox h-5 w-5 accent-gray-600";
  checkbox.dataset.productId = product.id;
  checkbox.addEventListener("change", updateProduct);

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
  productPriceElement.textContent = `$${product.price}`;

  productDetails.appendChild(productNameElement);
  productDetails.appendChild(productPriceElement);

  productItem.appendChild(checkbox);
  productItem.appendChild(img);
  productItem.appendChild(productDetails);

  productList.appendChild(productItem);
}

// updateProduct
function updateProduct(event) {
  const productId = parseInt(event.target.dataset.productId, 10);
  const product = products.find((product) => product.id === productId);

  if (product) {
    product.checked = event.target.checked;
  }
}

// Add Cart
function addCart() {
  cart = [];
  const selectedProducts = products.filter((product) => product.checked);
  cart = [...selectedProducts];
  renderCart();
}

// renderCart
function renderCart() {
  const cartList = document.querySelector("#cartList");

  cartList.innerHTML = "";

  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.className =
      "p-4 bg-gray rounded-lg shadow-md flex items-center space-x-4";

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
    productPriceElement.textContent = `$${product.price}`;

    productDetails.appendChild(productNameElement);
    productDetails.appendChild(productPriceElement);

    cartItem.appendChild(img);
    cartItem.appendChild(productDetails);

    cartList.appendChild(cartItem);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "bg-orange-500 text-white rounded-lg px-2 ml-2";
    removeButton.addEventListener("click", () => removeFromCart(product.id));
    cartItem.appendChild(removeButton);
  });
}

// removeFromCart
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);
  renderCart();
}

// Add Event Listeners
document.getElementById("calculateButton").addEventListener("click", () => {
  const totalPrice = cart.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );
  document.getElementById(
    "totalPrice"
  ).innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
});
