const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let cart = [];


/* ================= CART ================= */

cartButton.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

cartPanel.addEventListener("click", event => {

    if (event.target === cartPanel) {
        cartPanel.classList.remove("active");
    }

});


/* ================= SEARCH ================= */

searchButton.addEventListener("click", () => {

    searchPanel.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});

closeSearch.addEventListener("click", () => {
    searchPanel.classList.remove("active");
});

searchPanel.addEventListener("click", event => {

    if (event.target === searchPanel) {
        searchPanel.classList.remove("active");
    }

});


/* ================= PRODUCTS ================= */

const products = [

    {
        name: "Urban Essential",
        category: "New Arrival",
        price: 48
    },

    {
        name: "Modern Layer",
        category: "New Arrival",
        price: 58
    },

    {
        name: "Everyday Statement",
        category: "New Arrival",
        price: 64
    },

    {
        name: "Modern Essential",
        category: "Men",
        price: 49
    },

    {
        name: "Street Layer",
        category: "Men",
        price: 55
    },

    {
        name: "City Fit",
        category: "Men",
        price: 61
    },

    {
        name: "Signature Look",
        category: "Men",
        price: 72
    },

    {
        name: "Modern Form",
        category: "Women",
        price: 52
    },

    {
        name: "Soft Statement",
        category: "Women",
        price: 57
    },

    {
        name: "City Elegance",
        category: "Women",
        price: 66
    },

    {
        name: "Signature Edit",
        category: "Women",
        price: 74
    }

];


/* ================= PRODUCT SEARCH ================= */

searchInput.addEventListener("input", () => {

    const value =
        searchInput.value.toLowerCase().trim();

    if (!value) {

        searchResults.innerHTML = "";
        return;

    }

    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(value)

            ||

            product.category
                .toLowerCase()
                .includes(value)

        );


    if (filteredProducts.length === 0) {

        searchResults.innerHTML =
            "<p>No matching products found.</p>";

        return;

    }


    searchResults.innerHTML =
        filteredProducts.map(product => `

            <div
                style="
                display:flex;
                justify-content:space-between;
                gap:20px;
                padding:16px 0;
                border-bottom:1px solid rgba(0,0,0,.1);
                "
            >

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p
                        style="
                        margin-top:4px;
                        font-size:.8rem;
                        color:#7a726c;
                        "
                    >
                        ${product.category}
                    </p>

                </div>

                <strong>
                    $${product.price.toFixed(2)}
                </strong>

            </div>

        `).join("");

});


/* ================= ADD TO BAG ================= */

document
.querySelectorAll(".add-cart")
.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.product;

        const price =
            Number(button.dataset.price);


        const existing =
            cart.find(item =>
                item.name === name
            );


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name,
                price,
                quantity: 1

            });

        }


        updateCart();


        button.textContent = "Added ✓";


        setTimeout(() => {

            button.textContent =
                "Add to Bag";

        }, 1200);

    });

});


/* ================= UPDATE CART ================= */

function updateCart() {

    const itemCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        itemCount;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your bag is currently empty.
            </p>

        `;

        cartTotal.textContent =
            "$0.00";

        return;

    }


    cartItems.innerHTML =
        cart.map((item, index) => `

            <div
                style="
                padding:18px 0;
                border-bottom:
                1px solid rgba(37,34,32,.12);
                "
            >

                <div
                    style="
                    display:flex;
                    justify-content:
                    space-between;
                    gap:20px;
                    "
                >

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <p
                            style="
                            margin-top:5px;
                            color:#776f69;
                            font-size:.8rem;
                            "
                        >

                            $${item.price.toFixed(2)}

                        </p>

                    </div>


                    <button
                        onclick="
                        removeCartItem(${index})
                        "
                        style="
                        width:34px;
                        height:34px;
                        border-radius:50%;
                        border:
                        1px solid rgba(0,0,0,.12);
                        background:transparent;
                        color:#222;
                        "
                    >
                        ×
                    </button>

                </div>


                <div
                    style="
                    display:flex;
                    align-items:center;
                    gap:14px;
                    margin-top:14px;
                    "
                >

                    <button
                        onclick="
                        changeCartQuantity(
                            ${index}, -1
                        )
                        "
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="
                        changeCartQuantity(
                            ${index}, 1
                        )
                        "
                    >
                        +
                    </button>

                </div>

            </div>

        `).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


/* ================= CART QUANTITY ================= */

function changeCartQuantity(
    index,
    amount
) {

    cart[index].quantity += amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* ================= REMOVE PRODUCT ================= */

function removeCartItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================= ESC CLOSE ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            cartPanel
                .classList.remove("active");

            searchPanel
                .classList.remove("active");

        }

    }
);


/* ================= REVEAL EFFECT ================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, .value-card, .collection-links a, .about-copy p"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    revealObserver.observe(element);

});


/* ================= HERO IMAGE MOVEMENT ================= */

const heroImage =
    document.querySelector(
        ".hero-product img"
    );


if (heroImage) {

    document.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 980
            ) {
                return;
            }


            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 8;


            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 5;


            heroImage.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* ================= START ================= */

updateCart();