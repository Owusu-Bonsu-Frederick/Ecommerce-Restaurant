// Initialize the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart summary on the checkout page
function updateCheckoutSummary() {
    const cartSummary = document.querySelector('.cart-summary');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cartSummary) {
        cartSummary.innerHTML = `
            <h2>Your Order</h2>
            ${cart.map(item => `
                <p>${item.name} - ${item.quantity} x $${item.price.toFixed(2)}</p>
            `).join('')}
            <p>Total: $${total.toFixed(2)}</p>
        `;
    }
}

// Function to save the order to localStorage
function saveOrder() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderDate = new Date().toLocaleString();

    const orderSummary = {
        items: cart,
        total: total,
        date: orderDate
    };

    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(orderSummary);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

// Payment form submission handling
document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Save the order before redirecting
    saveOrder();

    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Payment successful!');
    window.location.href = 'order-history.html';
});

// Initial cart summary update
updateCheckoutSummary();
