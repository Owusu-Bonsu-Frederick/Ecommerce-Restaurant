// order-history.js

// Function to load past orders from localStorage
function loadOrderHistory() {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const orderItemsContainer = document.querySelector('.order-items');

    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = '';

        orderHistory.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
                <h3>Order #${order.id}</h3>
                <p>Date: ${order.date}</p>
                <p>Time: ${order.time}</p>
                <p>Total: $${order.total.toFixed(2)}</p>
                <ul>
                    ${order.items.map(item => `
                        <li>${item.name} - ${item.quantity} x $${item.price.toFixed(2)}</li>
                    `).join('')}
                </ul>
                <p>Status: ${order.status}</p>
            `;
            orderItemsContainer.appendChild(orderItem);
        });
    }
}

// Function to save an order (this would be called after checkout)
function saveOrderHistory(order) {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

// Function to complete checkout (for example purposes)
function completeCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'Processing'
    };
    saveOrderHistory(order);
    localStorage.removeItem('cart'); // Clear cart after checkout
    window.location.href = 'order-history.html'; // Redirect to order history page
}

// Load order history when the page loads
loadOrderHistory();
