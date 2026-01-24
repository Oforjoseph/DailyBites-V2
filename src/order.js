// Tab Switching
function switchTab(tabName) {
  // --- EXISTING LOGIC ---

  document
    .querySelectorAll(".tab-section")
    .forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(tabName).classList.remove("hidden");

  // ---  updated URL hash ---
  window.location.hash = tabName;
}
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1); // remove #
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  } else {
    switchTab("menu");
  }
});
// Menu Filter Functions
function filterMenu() {
  const searchTerm = document.getElementById("menuSearch").value.toLowerCase();
  const menuItems = document.querySelectorAll(".menu-item");
  let visibleCount = 0;

  menuItems.forEach((item) => {
    const title = item.querySelector("h3").textContent.toLowerCase();
    const description = item.querySelector("p").textContent.toLowerCase();
    const matchesSearch =
      title.includes(searchTerm) || description.includes(searchTerm);

    if (matchesSearch) {
      item.style.display = "block";
      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  document.getElementById("itemCount").textContent = visibleCount;
}

function updatePriceFilter(value) {
  document.getElementById("priceValue").textContent =
    "₦" + parseInt(value).toLocaleString();
}

// Cart Functions
let cart = [];
let cartTotal = 0;

function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });
  cartTotal += price;
  updateCart();

  // Show notification
  alert(`${itemName} added to cart!`);
}

function toggleMenu() {
  const nav = document.getElementById("tabNav");
  nav.classList.toggle("hidden");
  nav.classList.toggle("flex");
  nav.classList.add("flex-col");
}

function closeMenu() {
  if (window.innerWidth < 640) {
    const nav = document.getElementById("tabNav");
    nav.classList.add("hidden");
    nav.classList.remove("flex");
  }
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartTotal").textContent =
    "₦" + cartTotal.toLocaleString();

  const cartItems = document.getElementById("cartItems");
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-center text-gray-400 mt-20">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, index) => `
          <div class="p-4 rounded-xl mb-3" style="background-color: var(--color-dark);">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-bold">${item.name}</p>
                <p class="text-sm" style="color: var(--color-primary);">₦${item.price.toLocaleString()}</p>
              </div>
              <button onclick="removeFromCart(${index})" class="text-red-500 hover:scale-110 transition">
                <i class="ion-close-circled text-2xl"></i>
              </button>
            </div>
          </div>
        `,
      )
      .join("");
  }
}

function removeFromCart(index) {
  cartTotal -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  if (sidebar.classList.contains("translate-x-full")) {
    sidebar.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  } else {
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }
}

// FAQ Functions
function toggleAccordion(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector(".accordion-icon");
  const isActive = content.classList.contains("active");

  // Close accordions
  document.querySelectorAll(".accordion-content").forEach((item) => {
    item.classList.remove("active");
  });
  document.querySelectorAll(".accordion-icon").forEach((item) => {
    item.classList.remove("ion-ios-minus");
    item.classList.add("ion-ios-plus");
  });

  // Open clicked accordion
  if (!isActive) {
    content.classList.add("active");
    icon.classList.remove("ion-ios-plus");
    icon.classList.add("ion-ios-minus");
  }
}

function searchFAQ() {
  const searchTerm = document.getElementById("faqSearch").value.toLowerCase();
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector("span").textContent.toLowerCase();
    const answer = item
      .querySelector(".accordion-content p")
      .textContent.toLowerCase();

    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function filterFAQ(category) {
  const faqItems = document.querySelectorAll(".faq-item");
  const buttons = document.querySelectorAll(".faq-category-btn");

  // Update button styles
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filter items
  faqItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Track Order Functions
function trackOrder() {
  const orderId = document.getElementById("orderIdInput").value;

  if (orderId.trim() === "") {
    alert("Please enter an Order ID");
    return;
  }

  // Show tracking result
  document.getElementById("trackingResult").classList.remove("hidden");

  // Scroll to result
  document
    .getElementById("trackingResult")
    .scrollIntoView({ behavior: "smooth" });
}

function showDemoTracking() {
  document.getElementById("orderIdInput").value = "DB12345";
  trackOrder();
}

// Add active state styles for FAQ categories
const style = document.createElement("style");
style.textContent = `
      .faq-category-btn.active {
        background: linear-gradient(135deg, var(--color-secondary), var(--color-accent)) !important;
        color: white !important;
      }
    `;
document.head.appendChild(style);
