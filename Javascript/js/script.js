import { getProducts } from './product.js';

let products = getProducts();
let editIndex = null;

const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sortPrice');

window.onload = () => displayProducts(products);

// Event Listeners
addBtn.addEventListener('click', addProduct);
searchInput.addEventListener('input', handleSearch);
sortSelect.addEventListener('change', handleSort);

function addProduct() {
    const titleInput = document.getElementById('title').value;
    const priceInput = document.getElementById('price').value;
    const imageInput = document.getElementById('image').value;
    const categoryInput = document.getElementById('category').value || 'General';

    if (!titleInput || !priceInput) {
        alert("Title and Price are required!");
        return;
    }

    const productData = { 
        name: titleInput, 
        price: parseFloat(priceInput), 
        image: imageInput, 
        category: categoryInput 
    };

    if (editIndex === null) {
        products.push(productData);
    } else {
        products[editIndex] = productData;
        editIndex = null;
        addBtn.innerText = "Add Product";
        addBtn.style.backgroundColor = "#28a745";
    }

    saveAndRefresh();
    clearInputs();
}

function displayProducts(data) {
    const list = document.getElementById('productList');
    list.innerHTML = "";

    data.forEach((prod, index) => {
        const div = document.createElement('div');
        div.className = "product-item";
        div.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}">
            <div class="product-details">
                <h3 class="product-name">${prod.name || prod.title}</h3>
                <span class="category-tag">${prod.category}</span>
                <span class="price">$${prod.price}</span>
            </div>
            <div>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });

    // Handle dynamic buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = () => prepareEdit(btn.getAttribute('data-index'));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => deleteProduct(btn.getAttribute('data-index'));
    });
}

function saveAndRefresh() {
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(products);
}

function deleteProduct(index) {
    if(confirm("Are you sure?")) {
        products.splice(index, 1);
        saveAndRefresh();
    }
}

function prepareEdit(index) {
    const prod = products[index];
    document.getElementById('title').value = prod.name || prod.title;
    document.getElementById('price').value = prod.price;
    document.getElementById('image').value = prod.image;
    document.getElementById('category').value = prod.category;

    editIndex = index;
    addBtn.innerText = "Update Product";
    addBtn.style.backgroundColor = "#ffc107";
}

function handleSearch() {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter(p => (p.name || p.title).toLowerCase().includes(term));
    displayProducts(filtered);
}

function handleSort() {
    const sortType = sortSelect.value;
    let sorted = [...products];
    if (sortType === 'low') sorted.sort((a, b) => a.price - b.price);
    if (sortType === 'high') sorted.sort((a, b) => b.price - a.price);
    displayProducts(sorted);
}

function clearInputs() {
    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('image').value = "";
    document.getElementById('category').value = "";
}