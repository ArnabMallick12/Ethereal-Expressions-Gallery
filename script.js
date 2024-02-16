// Simulated data - replace with dynamic data from your backend
const featuredProducts = [
    { name: 'Vintage Dress', price: 50, imageUrl: 'dress.jpg' },
    { name: 'Designer Handbag', price: 100, imageUrl: 'handbag.jpg' },
    // Add more products as needed
];

document.addEventListener('DOMContentLoaded', function () {
    const featuredProductsSection = document.getElementById('featured-products');

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsSection.appendChild(productCard);
    });
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.name;

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    card.appendChild(image);
    card.appendChild(productName);
    card.appendChild(price);

    return card;
}
