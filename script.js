const menu = [
    // Burgers and fast food
    { id: 1, name: "Veg Burger", price: 99, emoji: "🍔" },
    { id: 2, name: "Chicken Burger", price: 149, emoji: "🍔" },
    { id: 3, name: "Pizza", price: 199, emoji: "🍕" },
    { id: 4, name: "French Fries", price: 79, emoji: "🍟" },
    { id: 5, name: "Sandwich", price: 89, emoji: "🥪" },
    { id: 6, name: "Chicken Nuggets", price: 129, emoji: "🍗" },

    // Indian food
    { id: 7, name: "Veg Biryani", price: 159, emoji: "🍛" },
    { id: 8, name: "Chicken Biryani", price: 219, emoji: "🍗" },
    { id: 9, name: "Masala Dosa", price: 80, emoji: "🥞" },
    { id: 10, name: "Idli Sambar", price: 60, emoji: "🥘" },
    { id: 11, name: "Paneer Butter Masala", price: 189, emoji: "🍲" },
    { id: 12, name: "Butter Naan", price: 40, emoji: "🫓" },
    { id: 13, name: "Veg Fried Rice", price: 139, emoji: "🍚" },
    { id: 14, name: "Chicken Fried Rice", price: 179, emoji: "🍚" },

    // Italian food
    { id: 15, name: "White Sauce Pasta", price: 149, emoji: "🍝" },
    { id: 16, name: "Red Sauce Pasta", price: 139, emoji: "🍝" },
    { id: 17, name: "Garlic Bread", price: 99, emoji: "🥖" },

    // Drinks
    { id: 18, name: "Cold Coffee", price: 69, emoji: "☕" },
    { id: 19, name: "Fresh Orange Juice", price: 49, emoji: "🧃" },
    { id: 20, name: "Mango Milkshake", price: 89, emoji: "🥭" },
    { id: 21, name: "Lemon Soda", price: 39, emoji: "🥤" },

    // Desserts
    { id: 22, name: "Vanilla Ice Cream", price: 59, emoji: "🍨" },
    { id: 23, name: "Chocolate Cake", price: 99, emoji: "🍰" },
    { id: 24, name: "Gulab Jamun", price: 50, emoji: "🍮" }
];

let cart = [];

const menuList = document.getElementById("menu-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const tableNumber = document.getElementById("table-number");
const orderMessage = document.getElementById("order-message");

// Display food menu
function displayMenu() {
    menuList.innerHTML = menu.map(food => `
        <div class="food-card">
            <div class="food-image">${food.emoji}</div>
            <h3>${food.name}</h3>
            <p class="price">₹${food.price}</p>
            <button class="add-btn" data-id="${food.id}">
                + Add to Cart
            </button>
        </div>
    `).join("");
}

// Add food to cart
menuList.addEventListener("click", function(event) {
    const button = event.target.closest(".add-btn");
    if (!button) return;

    const id = Number(button.dataset.id);
    const food = menu.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    orderMessage.textContent = "";
    updateCart();
});

// Increase and decrease quantities
cartItems.addEventListener("click", function(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const item = cart.find(food => food.id === id);

    if (!item) return;

    if (button.dataset.action === "increase") {
        item.quantity++;
    } else {
        item.quantity--;

        if (item.quantity === 0) {
            cart = cart.filter(food => food.id !== id);
        }
    }

    orderMessage.textContent = "";
    updateCart();
});

// Update cart and bill
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.emoji} ${item.name}</span>

                <div class="quantity-controls">
                    <button data-action="decrease"
                            data-id="${item.id}">−</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase"
                            data-id="${item.id}">+</button>
                </div>

                <strong>₹${item.price * item.quantity}</strong>
            </div>
        `).join("");
    }

    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = count;
    totalPrice.textContent = total.toFixed(2);
}

// Place order
document.getElementById("place-order").addEventListener(
    "click", function() {
        const table = tableNumber.value;

        if (!table) {
            orderMessage.textContent =
                "Please select a table number.";
            return;
        }

        if (cart.length === 0) {
            orderMessage.textContent =
                "Please add food to your cart.";
            return;
        }

        const orderId = "ORD" +
            Date.now().toString().slice(-6);

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        const items = cart.map(item =>
            `${item.name} x ${item.quantity}`
        ).join(", ");

        orderMessage.textContent =
            `Order successful! Order ID: ${orderId}. ` +
            `Table: ${table}. Items: ${items}. ` +
            `Total: ₹${total.toFixed(2)}.`;

        alert(
            "ORDER CONFIRMED!\n" +
            "Order ID: " + orderId + "\n" +
            "Table: " + table + "\n" +
            "Items: " + items + "\n" +
            "Total: ₹" + total.toFixed(2)
        );

        cart = [];
        updateCart();
    }
);

// Start application
displayMenu();
updateCart();
