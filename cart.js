function removeFromCart(productId) { 

        let cart = JSON.parse(localStorage.getItem('cart')) || []; 

        cart = cart.filter(item => item.id !== productId)

        localStorage.setItem('cart', JSON.stringify(cart))

        updateCartCount()
    }


function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const cartItems = document.getElementById('cart-items')
    const cartTotal = document.getElementById('cart-total')
    
    cartItems.innerHTML = ''; 
    

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Корзина пуста</p>`
        cartTotal.textContent = '0 руб.'
        return; 
    }

    let total = 0;
    cartItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
        <div class="cart-item">
        <img src="../${item.image}" alt= "${item.name}" />
        <div>
        <p>${item.price} руб * ${item.quantity} = ${item.price * item.quantity}</p>
        <button class="remove-btn" data-id="${item.id}">Удалить товар</button>
        </div>
        </div>
        `
    });


    cartTotal.textContent = `${total} руб`


    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => { 
            const productId = parseInt(e.target.dataset.id)
            removeFromCart(productId)
            renderCart()
        })
    })

}


const checkoutBtn = document.getElementById("checkout-btn")
const modal = document.getElementById("order-modal")
const go = document.getElementById("go")

checkoutBtn.addEventListener("click", () => {
    modal.style.display = "block";
})

go.addEventListener("click", () => {
    modal.style.display = "none";
})


document.addEventListener('DOMContentLoaded', renderCart)