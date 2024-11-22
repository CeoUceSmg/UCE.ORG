// Save users in localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        { email: 'user1@example.com', password: 'password123', balance: 10000 }
    ]));
}

// Login Functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid email or password!');
        }
    });
}

// Load Dashboard
const welcomeMessage = document.getElementById('welcomeMessage');
if (welcomeMessage) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        welcomeMessage.innerText = `Hello, ${currentUser.email}`;
        document.getElementById('walletBalance').innerText = `₦${currentUser.balance}`;
    } else {
        window.location.href = 'login.html';
    }
}

// Transaction Functionality
const transactionForm = document.getElementById('transactionForm');
if (transactionForm) {
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const service = document.getElementById('service').value;
        const amount = parseFloat(document.getElementById('amount').value);

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser.balance >= amount) {
            currentUser.balance -= amount;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            alert(`Transaction successful! ${service} of ₦${amount} completed.`);
            window.location.href = 'dashboard.html';
        } else {
            alert('Insufficient balance!');
        }
    });
}
