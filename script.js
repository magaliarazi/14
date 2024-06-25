let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCart();
});

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
    }

    saveCartToLocalStorage();
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>El carrito está vacío.</p>';
        updateTotal(0);
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h7>${item.name}</h7>
            <p>Precio: $${item.price}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartElement.appendChild(itemElement);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    updateTotal(totalPrice);
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }

    saveCartToLocalStorage();
    updateCart();
}

function updateTotal(totalPrice) {
    const totalElement = document.getElementById('total');
    totalElement.innerHTML = `<p>Total de la Compra: $${totalPrice}</p>`;
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function comprar() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Añade productos antes de comprar.');
        return;
    }

    // Aquí puedes agregar lógica adicional para procesar el pago y realizar la compra.

    alert('Compra realizada con éxito!');
    cart = []; // Vaciar el carrito
    saveCartToLocalStorage(); // Asegurar que el carrito vacío se guarda en localStorage
    updateCart();
}
