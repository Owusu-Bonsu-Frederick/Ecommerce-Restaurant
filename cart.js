// cart.js

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

    // Event delegation for dynamic content
    document.body.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('add-to-cart')) {
            const dishCard = event.target.closest('.dish-card');
            const dishName = dishCard.querySelector('h3').innerText;
            const dishPrice = parseFloat(dishCard.querySelector('p').innerText.replace('$', ''));

            addToCart(dishName, dishPrice);
        }
    });

    // Function to remove a product from the cart
    window.removeFromCart = function (productName) {
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

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

    // Initial cart update
    updateCart();
});
