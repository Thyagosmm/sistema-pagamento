let cart = [];

function addToCart(product) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const counter = document.getElementById('cart-counter');
    if(counter) counter.textContent = cart.length;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    
        document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = JSON.parse(button.dataset.product);
            addToCart(product);
        });
    });
});