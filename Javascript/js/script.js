//  Initial data from Local Storage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let editIndex = null;

    window.onload = () => displayProducts(products);

    function addProduct() {
        const titleInput = document.getElementById('title').value;
        const priceInput = document.getElementById('price').value;
        
        const imageInput = document.getElementById('image').value || 'https://via.placeholder.com/80?text=Product';
        const categoryInput = document.getElementById('category').value || 'General';

        // Validation
        if (!titleInput || !priceInput) {
            alert("Title and Price are required!");
            return;
        }

        const productData = { 
            title: titleInput, 
            price: parseFloat(priceInput), 
            image: imageInput, 
            category: categoryInput 
        };

        if (editIndex === null) {
            products.push(productData); // CREATE
        } else {
            products[editIndex] = productData; // UPDATE
            editIndex = null;
            document.getElementById('addBtn').innerText = "Add Product";
            document.getElementById('addBtn').style.backgroundColor = "#28a745";
        }

        saveAndRefresh();
        clearInputs();
    }

    function displayProducts(data) {
        const list = document.getElementById('productList');
        list.innerHTML = "";

        data.forEach((prod, index) => {
            //  Display with Name, Price, Image, Category
            const div = document.createElement('div');
            div.className = "product-item";
            div.innerHTML = `
                <img src="${prod.image}" alt="${prod.title}">
                <div class="product-details">
                    <h3 class="product-name">${prod.title}</h3>
                    <span class="category-tag">${prod.category}</span>
                    <span class="price">$${prod.price}</span>
                </div>
                <div>
                    <button class="edit-btn" onclick="prepareEdit(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    //  Local Storage Persistence
    function saveAndRefresh() {
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(products);
    }

    //  Delete Function
    function deleteProduct(index) {
        if(confirm("Are you sure you want to delete this product?")) {
            products.splice(index, 1);
            saveAndRefresh();
        }
    }

    // Edit Function
    function prepareEdit(index) {
        const prod = products[index];
        document.getElementById('title').value = prod.title;
        document.getElementById('price').value = prod.price;
        document.getElementById('image').value = prod.image;
        document.getElementById('category').value = prod.category;

        editIndex = index;
        document.getElementById('addBtn').innerText = "Update Product";
        document.getElementById('addBtn').style.backgroundColor = "#ffc107";
    }

    // Search and Sort
    function handleSearch() {
        const term = document.getElementById('search').value.toLowerCase();
        const filtered = products.filter(p => p.title.toLowerCase().includes(term));
        displayProducts(filtered);
    }

    function handleSort() {
        const sortType = document.getElementById('sortPrice').value;
        let sorted = [...products];
        if (sortType === 'low') sorted.sort((a, b) => a.price - b.price);
        if (sortType === 'high') sorted.sort((a, b) => b.price - a.price);
        displayProducts(sorted);
    }

    //Clear Inputs
    function clearInputs() {
        document.getElementById('title').value = "";
        document.getElementById('price').value = "";
        document.getElementById('image').value = "";
        document.getElementById('category').value = "";
    }