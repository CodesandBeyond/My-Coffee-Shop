document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart from localStorage or initialize as empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add item to cart or update its quantity
    function addToCart(product, price) {
        const existingItem = cart.find(item => item.product === product);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if item already in cart
        } else {
            cart.push({ product, price, quantity: 1 }); // Initialize quantity to 1 if new item
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
        updateCartCount(); // Update cart count
        updateMenu(); // Update menu buttons
    }

    // Event listener for adding items to the cart

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
    
    // Update the cart item count display
    function updateCartCount() {
        let cartCount = document.querySelector('.cart-count');
        const totalItems = cart.reduce((count, item) => count + (item.quantity || 1), 0);
        if (cartCount) {
            cartCount.textContent = `(${totalItems})`;
        }
    }

    // Render the cart items on cart.html
    function renderCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        if (!cartItemsElement || !cartTotalElement) return; // Prevent errors if elements don't exist

        let total = 0;
        cartItemsElement.innerHTML = ''; // Clear current content

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <span>${item.product} - $${item.price.toFixed(2)}</span>
                    <div class="item-controls">
                        <button class="minus-btn" data-action="decrease" data-name="${item.product}"></button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="plus-btn" data-action="increase" data-name="${item.product}"></button>
                        <button class="remove-from-cart" data-name="${item.product}"></button>
                    </div>
                `;
                cartItemsElement.appendChild(itemElement);
            });
            cartTotalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
        }

        addCartControls(); // Add functionality to quantity update and remove buttons
        updateCartCount();
    }

    function addCartControls() {
        document.querySelectorAll('.plus-btn, .minus-btn').forEach(button => {
            button.addEventListener('click', function () {
                const productName = this.getAttribute('data-name');
                const action = this.getAttribute('data-action');
                updateQuantity(productName, action);
            });
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productName = this.getAttribute('data-name');
                removeFromCart(productName);
            });
        });
    }

    function updateQuantity(productName, action) {
        const item = cart.find(item => item.product === productName);
        if (item) {
            if (action === 'increase') {
                item.quantity++;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity--;
            } else if (action === 'decrease' && item.quantity === 1) {
                removeFromCart(productName);
                return;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function removeFromCart(productName) {
        cart = cart.filter(item => item.product !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    // Initial cart count and menu update
    updateCartCount();
    function updateMenu() {
        console.log("Menu updated!");
      }
    updateMenu();

    // If on cart page, render the cart
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});
