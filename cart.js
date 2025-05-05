let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  let existingProduct = cart.find((item) => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  showNotification("Товар добавлен в корзину");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateQuantity(index, delta) {
  cart[index].quantity = Math.max(1, cart[index].quantity + delta);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount)
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartItems = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartContent = document.getElementById("cart-content");

  if (!cartItems) return; // Not on cart page

  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartContent.classList.add("hidden");
    return;
  }

  cartEmpty.classList.add("hidden");
  cartContent.classList.remove("hidden");

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
        <div class="bg-white rounded-xl p-4 shadow-md animate-fade-in">
            <div class="flex gap-4">
                <img src="${item.image}" alt="${
        item.name
      }" class="w-24 h-24 object-cover rounded-lg">
                <div class="flex-grow">
                    <h3 class="font-bold">${item.name}</h3>
                    <p class="text-gray-500">${item.price} ₽</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="updateQuantity(${index}, -1)" class="px-2 py-1 bg-gray-100 rounded">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="px-2 py-1 bg-gray-100 rounded">+</button>
                    </div>
                </div>
                <div class="flex flex-col justify-between items-end">
                    <button onclick="removeFromCart(${index})" class="text-gray-400 hover:text-red-500">
                        <i class="fas fa-times"></i>
                    </button>
                    <span class="font-bold">${
                      item.price * item.quantity
                    } ₽</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = total + " ₽";
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  if (!notification) return;

  notification.textContent = message;
  notification.classList.remove("translate-y-full", "opacity-0");
  setTimeout(() => {
    notification.classList.add("translate-y-full", "opacity-0");
  }, 2000);
}

// Initialize cart
document.addEventListener("DOMContentLoaded", updateCartUI);
