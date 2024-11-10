document.addEventListener('DOMContentLoaded', function () {
    // Toggle navigation menu on hamburger click
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
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

    function navigateToPayoutPage() {
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            const total = cartTotalElement.textContent.split('$')[1];
            localStorage.setItem('cartTotal', total);
            window.location.href = 'payout.html';
        }
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

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', navigateToPayoutPage);
    }

    const totalAmountInput = document.getElementById('total-amount');
        const cartTotal = localStorage.getItem('cartTotal');
        
        if (cartTotal) {
            totalAmountInput.value = `$${parseFloat(cartTotal).toFixed(2)}`;
        } else {
            totalAmountInput.value = '$0.00';
        }

        const form = document.querySelector('#payment-form form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle the form submission,
            // such as sending the data to a server
            alert('Thank you for your purchase!');
            // Clear the cart and total after purchase
            localStorage.removeItem('cart');
            localStorage.removeItem('cartTotal');
            // Redirect to home page or order confirmation page
            window.location.href = 'index.html';
        });
});
