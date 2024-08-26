document.addEventListener('DOMContentLoaded', function () {
    // Initialize the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add a product to the cart
    function addToCart(name, price) {
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        alert('Product added to cart!');
    }

    // Function to remove a product from the cart
    function removeFromCart(productName) {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Function to update the cart display
    function updateCart() {
        const cartItems = document.querySelector('.cart-items');
        if (cartItems) {
            cartItems.innerHTML = '';

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="btn remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });

            updateCartSummary();
        }
    }

    // Function to update the cart summary
    function updateCartSummary() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const cartSummary = document.querySelector('.cart-summary');
        if (cartSummary) {
            cartSummary.innerHTML = `
                <h2>Summary</h2>
                <p>Total: $${total.toFixed(2)}</p>
                <a href="checkout.html" class="btn">Proceed to Checkout</a>
            `;
        }
    }

    // Payment form submission handling
    document.getElementById('payment-form')?.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Payment successful!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        window.location.href = 'order-history.html'; // Redirect to order history
    });

    // Initial cart update
    updateCart();
});
document.addEventListener('DOMContentLoaded', function () {
    const orderItems = document.querySelector('.order-items');

    // Retrieve past orders from localStorage (dummy data)
    let pastOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];

    // Populate order history
    pastOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p>Items: ${order.items.map(item =>
            item.name).join(', ')}</p>
<p>Total: $${order.total.toFixed(2)}</p>
`;
        orderItems.appendChild(orderItem);
    });
});