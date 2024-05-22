
// search bar btn
function filterProducts() {
    var searchTerm = document.getElementById('search').value.toLowerCase();
    var products = document.querySelectorAll('.bike-card');

    const searchValue = search.value.toLowerCase().trim();
    for (i = 0; i < storeProducts.length; i++) {
        if (storeProducts[i].classList.contains(searchValue)) {
            storeProducts[i].style.display = "block";
        } else if (searchValue == "") {
            storeProducts[i].style.display = "block";
        } else {
            storeProducts[i].style.display = "none";
        }
    };
};


// search input
const search = document.getElementById("search");

search.addEventListener("keyup", (e) => {
    e.preventDefault();


    var searchTerm = document.getElementById('search').value.toLowerCase();
    var products = document.querySelectorAll('.bike-card');

    products.forEach(function (product) {
        var title = product.querySelector('h4').innerText.toLowerCase().trim();

        if (title.includes(searchTerm)) {
            product.style.display = 'block'; // Show matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    }
    )
});


// data fetch
// Fetch product data from JSON file
// using ES6 fetch here instead of old xml requests
fetch('products.json')
    .then(response => response.json())
    .then(products => {

        // Get the container for products
        const productsContainer = document.querySelector('.bike-cards');

        // Loop through each product and create HTML elements
        products.forEach(function (product) {
            // Create HTML elements for the product card
            var productCard = document.createElement('div');
            productCard.className = `bike-card ${product.type}`; // Add the 'type' as an additional class
            productCard.innerHTML = `
                <h4>${product.name}</h4>
                <img src="${product.image}" alt="${product.name}">
                <div class="add">
                <i class="fa-solid fa-cart-plus" onclick="addToCart('${product.name}', '${product.image}', '${product.price}')"></i>
                <i class="fa-solid fa-heart"></i>
                    <span class="price">${product.price}$</span>
                </div>
                `;

            // Append the product card to the container
            productsContainer.appendChild(productCard);
        });
    });

// data filter

document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll(".link");
    const productsContainer = document.getElementById("products-container");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            const filter = e.target.dataset.filter;

            filterBtns.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            productsContainer.querySelectorAll(".bike-card").forEach(product => {
                const productType = product.classList.contains(filter) || filter === "all";
                product.style.display = productType ? "block" : "none";
            });
        });
    });
});



// the cart 
let shoppingCart = document.getElementById("shoppingCart");
let cartBtn = document.getElementById("cartBtn");
let closeBtn = document.getElementById("closeBtn");
let closeBtn2 = document.getElementById("closeBtn2");

let addToCartBtn = document.getElementsByClassName('fa-solid fa-cart-plus');

// show cart btn
cartBtn.addEventListener('click', function () {
    shoppingCart.style.right = "0"
});

// close cart btn
closeBtn.addEventListener("click", function () {
    shoppingCart.style.right = "-400px"
});

closeBtn2.addEventListener("click", function () {
    shoppingCart.style.right = "-400px"
});


// add to cart function

function addToCart(name, image, price) {
    const cartItemsContainer = document.getElementById('itemsContainer');
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="item-details">
            <h3>${name}</h3>
            <span class="price">${price}$</span>
        </div>
        <span class="itemRemove" onclick="removeCartItem(this)">
        <i class="fa-solid fa-xmark"></i>
        </span>
    `;
    cartItemsContainer.appendChild(cartItem);

    //total price update
    updateTotalPrice();

    // Add the item to local storage
    addToLocalStorage(name, image, price);

    // Update the total quantity
    updateTotalQuantity()

    Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${name} has been added to the cart successfully!`,
        showConfirmButton: false,
        timer: 1500
    });
}


// total price

function removeCartItem(button) {
    const cartItem = button.parentElement;
    const name = cartItem.querySelector('h3').textContent;

    // Remove the item from local storage
    removeFromLocalStorage(name);

    // Update the total quantity
    updateTotalQuantity();

    cartItem.remove();

    // Update the total price after removing the item
    updateTotalPrice();

    Swal.fire({
        icon: 'success',
        title: 'Removed From Cart!',
        text: `${name} has been removed from the cart successfully!`,
        showConfirmButton: false,
        timer: 1500
    });
}


function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');

    if (totalPriceElement) {
        let totalPrice = 0;
        const cartItems = document.querySelectorAll('#itemsContainer li:not([style="display: none;"])');

        cartItems.forEach((cartItem) => {
            const priceElement = cartItem.querySelector('.price');

            if (priceElement) {
                const priceText = priceElement.textContent;
                const price = parseFloat(priceText);
                totalPrice += price;
            }
        });

        totalPriceElement.textContent = `${totalPrice}$`;
    }
}

updateTotalPrice();



// localstorage cart items saving

function addToLocalStorage(name, image, price) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.push({ name, image, price });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


// Function to remove item from local storage
function removeFromLocalStorage(name) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Remove the item from the cartItems array based on the name
    cartItems = cartItems.filter(item => item.name !== name);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


// Update the total quantity
function updateTotalQuantity() {
    const totalQuantityElement = document.querySelector('.totalQuantity');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Update the total quantity displayed
    totalQuantityElement.textContent = cartItems.length.toString();
}

// Initial update of total quantity when the page loads
updateTotalQuantity();

//
window.onload = function () {
    loadCartItemsFromLocalStorage();
    updateTotalPrice();
    updateTotalQuantity();
};


// Function to load items from local storage
function loadCartItemsFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('itemsContainer');

    // Clear the existing items in the cart
    cartItemsContainer.innerHTML = '';

    // Add items from local storage to the cart
    cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <span class="price">${item.price}$</span>
            </div>
            <span class="itemRemove" onclick="removeCartItem(this)">X</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}


/// login functions

document.addEventListener("DOMContentLoaded", function () {
    let loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        location.href = "login.html";
      });
    } else {
      console.error("Element with id 'loginBtn' not found.");
    }
  });


