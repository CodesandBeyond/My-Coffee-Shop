document.addEventListener('DOMContentLoaded', function() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            total += item.price;
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.product} - $${item.price.toFixed(2)}`;
            cartItemsElement.appendChild(itemElement);
        });

        cartTotalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    }
});

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCart();
    updateCartCount();
}