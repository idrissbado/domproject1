// Function to update local storage
function updateLocalStorage() {
    const products = [];
    document.querySelectorAll('.col-md-4').forEach(card => {
        const name = card.querySelector('.card-title').textContent;
        const price = parseFloat(card.querySelector('.unit-price').textContent);
        const quantity = parseInt(card.querySelector('.quantity').textContent);
        if (quantity > 0) {
            products.push({ name, price, quantity });
        }
    });
    localStorage.setItem('cart', JSON.stringify(products));
}

// Function to update total price
function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.col-md-4').forEach(card => {
        const price = parseFloat(card.querySelector('.unit-price').textContent);
        const quantity = parseInt(card.querySelector('.quantity').textContent);
        total += price * quantity;
    });
    document.querySelector('.total').textContent = `${total} $`;
}

// Increment and decrement quantity
document.querySelectorAll('.plus-btn, .minus-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const quantityElement = e.target.closest('div').querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (e.target.closest('.plus-btn')) {
            quantity++;
        } else if (e.target.closest('.minus-btn') && quantity > 0) {
            quantity--;
        }
        quantityElement.textContent = quantity;
        updateTotalPrice();
        updateLocalStorage();
    });
});

// Delete items from the cart
document.querySelectorAll('.delete-item').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.col-md-4');
        card.remove();
        updateTotalPrice();
        updateLocalStorage();
    });
});

// Like items
document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('text-danger');
    });
});

// Load cart from local storage on page load
window.addEventListener('load', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        const productCard = Array.from(document.querySelectorAll('.card-title')).find(
            title => title.textContent === item.name
        ).closest('.col-md-4');
        if (productCard) {
            productCard.querySelector('.quantity').textContent = item.quantity;
        }
    });
    updateTotalPrice();
});