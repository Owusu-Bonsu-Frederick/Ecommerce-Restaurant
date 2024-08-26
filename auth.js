// Handle login
document.getElementById('login-button')?.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.username === username && user.password === password) {
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to the home page
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Handle sign-up
document.getElementById('signup-button')?.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert('Sign up successful! You can now log in.');
        // Optionally redirect to login page or clear fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Please enter both username and password.');
    }
});
