const images = ["images/okro soup.jfif", "images/cripsy chicken.jfif"];
let current = 0;
const imgElement = document.querySelector('.content-right img');
setInterval(() => {
    current = (current + 1) % images.length;
    if(imgElement) imgElement.src = images[current];
}, 4000);

let cart = [];
// Cart page logic
if (document.body.classList.contains('cart-page') || document.getElementById('cart-list')) {
    function renderCart() {
        const cartList = document.getElementById('cart-list');
        const cartTotal = document.getElementById('cart-total');
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cartList.innerHTML = '';
        let total = 0;
        if(cart.length === 0) {
            cartList.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
            cartTotal.textContent = '';
        } else {
            cart.forEach((item, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `<span class='cart-item-name'>${item.name}</span> <span class='cart-item-price'>$${item.price.toFixed(2)} <button class='remove-cart-item' data-idx='${idx}' title='Remove'>&times;</button></span>`;
                cartList.appendChild(li);
                total += item.price;
            });
            cartTotal.textContent = 'Total: $' + total.toFixed(2);
        }
        document.querySelectorAll('.remove-cart-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-idx'));
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }
    var clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.onclick = function() {
            localStorage.removeItem('cart');
            renderCart();
        };
    }
    // Checkout button functionality for cart page
    if (document.getElementById('checkout-btn')) {
        document.getElementById('checkout-btn').onclick = function() {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }
            window.location.href = 'payment.html';
        };
    }
    renderCart();
}

const showCartBtn = document.getElementById('show-cart-btn');
if(showCartBtn) showCartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('cart-modal').style.display = 'flex';
    renderCart();
});
const closeCartBtn = document.getElementById('close-cart-btn');
if(closeCartBtn) closeCartBtn.addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        cart.push({ name, price });
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 250);
    });
});

// Hamburger menu functionality for mobile navigation with accessibility and keyboard support
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav ul');
    if (hamburger && navMenu) {
        // Toggle menu on click
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        // Toggle menu on Enter or Space key
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navMenu.classList.toggle('active');
            }
        });
        // Close menu when a nav link is clicked (mobile UX)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 800) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
});


const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
if(chatbotToggle && chatbotWindow && chatbotMessages && chatbotInput && chatbotSend) {
  chatbotToggle.addEventListener('click',()=>{
    chatbotWindow.style.display = chatbotWindow.style.display==='block'?'none':'block';
  });
  chatbotSend.addEventListener('click',()=>{
    const msg = chatbotInput.value.trim();
    if(!msg) return;
    chatbotMessages.innerHTML += `<div style='margin-bottom:4px;'><b>You:</b> ${msg}</div>`;
    chatbotInput.value = '';
    setTimeout(()=>{
      chatbotMessages.innerHTML += `<div style='margin-bottom:4px;'><b>Foodie:</b> Thanks for reaching out! We'll get back to you soon.`;
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 600);
  });
}
const scheduleInput = document.getElementById('schedule-time');
if(scheduleInput) {
  scheduleInput.addEventListener('change',()=>{
    localStorage.setItem('scheduledOrder',scheduleInput.value);
  });
  if(localStorage.getItem('scheduledOrder')){
    scheduleInput.value = localStorage.getItem('scheduledOrder');
  }
}
const cartIcon = document.querySelector('.cart-icon');
if(cartIcon) cartIcon.addEventListener('click',()=>{
  cartIcon.classList.add('clicked');
  setTimeout(()=>cartIcon.classList.remove('clicked'),250);
});
document.querySelectorAll('.add-to-cart-btn').forEach(btn=>{
  btn.addEventListener('mousedown',function(){
    this.style.transform = 'scale(0.93)';
  });
  btn.addEventListener('mouseup',function(){
    this.style.transform = '';
  });
});

// Animate Add to Cart button (menu page)
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 250);
    });
});
// Sticky nav (menu page)
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.sticky-nav');
    if(nav) {
        if(window.scrollY > 0) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});
// Gallery page filter functionality
if (document.querySelector('.gallery-page')) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
// Add to Cart functionality for 'Our Menu' section on index.html
if (document.querySelector('.category .add-to-cart-btn')) {
    document.querySelectorAll('.category .add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.card');
            const name = card.querySelector('.food-title h1').textContent.trim();
            const price = parseFloat(card.querySelector('.price span').textContent.replace('$', ''));
            // Get cart from localStorage or initialize
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            // Animate button
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 250);
        });
    });
}
// Add to Cart functionality for menu.html
if (document.querySelector('.menu-page .add-to-cart-btn')) {
    document.querySelectorAll('.menu-page .add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Get the item name and price from the <li> structure
            const li = this.closest('li');
            if (!li) return;
            // Extract name (text before <span>)
            const name = li.childNodes[0].textContent.trim();
            // Extract price from <span>
            const price = parseFloat(li.querySelector('span').textContent.replace('$', ''));
            // Get cart from localStorage or initialize
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            // Animate button
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 250);
        });
    });
}
// Add to Cart button text change to "Added" when clicked (index.html, menu.html, etc.)
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Added';
        this.disabled = true;
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1200);
    });
});

// Payment page logic
if (document.querySelector('.payment-page')) {
    // Load order summary from localStorage
    const orderSummaryDiv = document.getElementById('order-summary');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        orderSummaryDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let html = '<h3>Order Summary</h3><ul>';
        let total = 0;
        cart.forEach(item => {
            html += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
            total += item.price;
        });
        html += `</ul><div class='order-total'>Total: $${total.toFixed(2)}</div>`;
        orderSummaryDiv.innerHTML = html;
    }
    // Show/hide card details
    const paymentMethod = document.querySelector('select[name="payment-method"]');
    const cardDetails = document.getElementById('card-details');
    paymentMethod.addEventListener('change', function() {
        cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
    });
    cardDetails.style.display = paymentMethod.value === 'card' ? 'block' : 'none';
    // Handle form submit
    document.getElementById('payment-form').onsubmit = function(e) {
        e.preventDefault();
        alert('Payment processed! Thank you for your order.');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    };
}

// Payment page: redirect to tracking page after payment
if (document.querySelector('.payment-page')) {
    document.getElementById('payment-form').onsubmit = function(e) {
        e.preventDefault();
        // Gather order data
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        const name = this.elements['name'].value;
        const address = this.elements['address'].value;
        const orderNumber = 'FOOD' + Math.floor(Math.random() * 90000 + 10000);
        const delivery = '30 mins';
        // Save order for tracking
        const order = {
            number: orderNumber,
            name: name,
            address: address,
            items: cart,
            total: total,
            delivery: delivery,
            status: 0 // Start at placed
        };
        localStorage.setItem('currentOrder', JSON.stringify(order));
        alert('Payment processed! Thank you for your order.');
        localStorage.removeItem('cart');
        window.location.href = 'tracking.html';
    };
}

const order = JSON.parse(localStorage.getItem('currentOrder') || 'null');
if (!order) {
    // Show a message or redirect if no order is found
   const trackingContainer = document.querySelector('.tracking-container');
   trackingContainer.innerHTML = '<p>No order found. Please check your order status.</p>';
}


// Save order to localStorage on payment success for tracking
if (document.querySelector('.payment-page')) {
    document.getElementById('payment-form').onsubmit = function(e) {
        e.preventDefault();
        // Gather order data
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        const name = this.elements['name'].value;
        const address = this.elements['address'].value;
        const orderNumber = 'FOOD' + Math.floor(Math.random() * 90000 + 10000);
        const delivery = '30 mins';
        // Save order for tracking
        const order = {
            number: orderNumber,
            name: name,
            address: address,
            items: cart,
            total: total,
            delivery: delivery,
            status: 0 // Start at placed
        };
        localStorage.setItem('currentOrder', JSON.stringify(order));
        alert('Payment processed! Thank you for your order.');
        localStorage.removeItem('cart');
        window.location.href = 'tracking.html';
    };
}

// Tracking page: load real order data
if (document.querySelector('.tracking-page')) {
    const order = JSON.parse(localStorage.getItem('currentOrder') || 'null');
    if (!order) {
        document.querySelector('.tracking-container').innerHTML = '<h2>No order found</h2><p>Please place an order first.</p>';
    } else {
        document.getElementById('order-number').textContent = order.number;
        document.getElementById('customer-name').textContent = order.name;
        document.getElementById('delivery-address').textContent = order.address;
        document.getElementById('order-total').textContent = `$${order.total.toFixed(2)}`;
        document.getElementById('delivery-time').textContent = order.delivery;
        const itemsUl = document.getElementById('order-items');
        itemsUl.innerHTML = '';
        order.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            itemsUl.appendChild(li);
        });
        // Progress bar logic
        const steps = [
            { id: 'step-placed', msg: "Your order has been placed! We'll keep you updated." },
            { id: 'step-preparing', msg: 'Your food is being prepared by our chef.' },
            { id: 'step-out', msg: 'Your order is out for delivery. Hang tight!' },
            { id: 'step-delivered', msg: 'Order delivered! Enjoy your meal.' }
        ];
        function updateProgress(status) {
            steps.forEach((step, idx) => {
                const el = document.getElementById(step.id);
                if (el) {
                    if (idx <= status) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                }
            });
            document.getElementById('tracking-message').textContent = steps[status].msg;
        }
        updateProgress(order.status);
        // Simulate live updates
        let currentStatus = order.status;
        const interval = setInterval(() => {
            if (currentStatus < 3) {
                currentStatus++;
                updateProgress(currentStatus);
                // Save progress
                order.status = currentStatus;
                localStorage.setItem('currentOrder', JSON.stringify(order));
            } else {
                clearInterval(interval);
            }
        }, 8000);
    }
}