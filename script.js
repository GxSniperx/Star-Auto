const whatsappNumber = "212782924656";

const products = [
  { name: "Aigle solaire décoratif", price: "149 MAD" },
  { name: "Vélo solaire décoratif", price: "149 MAD" },
  { name: "Hélice décorative rouge", price: "149 MAD" },
  { name: "Drapeau islamique décoratif", price: "159 MAD" },
  { name: "Caméra embarquée HD", price: "749 MAD" },
  { name: "Caméra 360° voiture", price: "899 MAD" },
  { name: "Rétroviseur caméra DVR", price: "599 MAD" },
  { name: "Rétroviseur caméra Full HD", price: "549 MAD" },
  { name: "Ampoules LED voiture", price: "499 MAD" },
  { name: "Caméra de recul", price: "599 MAD" },
  { name: "Support téléphone magnétique", price: "149 MAD" },
  { name: "Support téléphone bras articulé", price: "139 MAD" },
  { name: "Support téléphone rotatif", price: "99 MAD" },
  { name: "Support téléphone compact", price: "90 MAD" },
  { name: "Support téléphone magnétique noire", price: "119 MAD" },
  { name: "Diffuseur voiture premium", price: "89 MAD" },
  { name: "Support téléphone fixe", price: "99 MAD" },
  { name: "Accessoire roue décorative", price: "119 MAD" },
];

let cart = [];

function displayProducts() {
  const container = document.getElementById("products");

  products.forEach((name, i) => {
    container.innerHTML += `
      <div class="product">
        <img 
  src="images/product${i+1}.png" 
  onclick="openImage(this.src)"
>
        <h3>${products[i].name}</h3>
        <p class="price">${products[i].price}</p>
        <button onclick="addToCart(${i})">Ajouter</button>
      </div>
    `;
  });
}

function addToCart(index) {
  const product = products[index];

  const existingItem = cart.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
  showCartToast();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const floatingCount = document.getElementById("floating-cart-count");
  const totalElement = document.getElementById("total");

  list.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach((item, i) => {
    const priceNumber = parseInt(item.price);
    total += priceNumber * item.quantity;
    itemCount += item.quantity;

    list.innerHTML += `
      <li class="cart-item">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>${item.price}</span>
        </div>

        <div class="cart-controls">
          <button onclick="decreaseQuantity(${i})">−</button>
          <span>x${item.quantity}</span>
          <button onclick="increaseQuantity(${i})">+</button>
          <button class="delete-btn" onclick="removeItem(${i})">🗑</button>
        </div>
      </li>
    `;
  });

  count.textContent = itemCount;
  if (floatingCount) floatingCount.textContent = itemCount;
  totalElement.textContent = total;
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Panier vide");
    return;
  }

  let msg = "Commande Star Auto:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const priceNumber = parseInt(item.price);
    const lineTotal = priceNumber * item.quantity;

    total += lineTotal;

    msg += `- ${item.name} x${item.quantity} : ${lineTotal} MAD%0A`;
  });

  msg += `%0ATotal: ${total} MAD`;

  window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
}

function openImage(src) {
  document.getElementById("imageModal").style.display = "flex";
  document.getElementById("modalImage").src = src;
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}

function increaseQuantity(i) {
  cart[i].quantity += 1;
  updateCart();
}

function decreaseQuantity(i) {
  if (cart[i].quantity > 1) {
    cart[i].quantity -= 1;
  } else {
    cart.splice(i, 1);
  }

  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function showCartToast() {
  const toast = document.getElementById("cart-toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

displayProducts();