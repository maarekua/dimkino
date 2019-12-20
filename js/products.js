function renderer(sort, filters) {
  fetch('json/product-items.json')
    .then(result => result.json())
    .then(products => {
      if (filters !== undefined) {
        products = productsFilter(filters, products);
      }
      if (sort !== undefined) {
        sortOptions(sort, products);
      }
      clearProductList();
      renderProducts(products);
      addEventListeners();
    });
}


document.querySelectorAll(".filter-checkbox").forEach(item => {
    item.addEventListener('change', productsFilterEvent);
})
    
let filterChoose = [];
    
function productsFilterEvent() {
  const categoryAll = document.querySelector('.category-all');
  const categoryAllData = categoryAll.dataset.filter.split(' ');
  const brandAll = document.querySelector('.brand-all');
  const brandAllData = brandAll.dataset.filter.split(' ');
  const categoryBtns = document.querySelectorAll('.category');
  const brandBtns = document.querySelectorAll('.brand');
  if (categoryAll.checked || brandAll.checked) {
    if (this.id === 'all-category' && this.checked) {
      categoryBtns.forEach(item => (item.checked = false));
    }
    if (this.id === 'all-brand' && this.checked) {
      brandBtns.forEach(item => (item.checked = false));
    }
  }
  if (this.classList.contains('category')) {
    categoryAll.checked = false;
  }
  if (this.classList.contains('brand')) {
    brandAll.checked = false;
  }
  filterChoose = [];
  if (!categoryAll.checked) {
    categoryBtns.forEach(item => {
      if (item.checked) {
        filterChoose.push(item.dataset.filter);
      } else {
        filterChoose = filterChoose.filter(item => filterChoose.includes(item));
      }
    });
  } else {
    filterChoose = filterChoose.concat(categoryAllData);
  }
  if (!brandAll.checked) {
    brandBtns.forEach(item => {
      if (item.checked) {
        filterChoose.push(item.dataset.filter);
      } else {
        filterChoose = filterChoose.filter(item => filterChoose.includes(item));
      }
    });
  } else {
    filterChoose = filterChoose.concat(brandAllData);
  }
 renderer(undefined, filterChoose)
}

function productsFilter(filters, products) {
    let filtered = [];
    products.filter(item => {
     for (let i = 0; i < filters.length; i++){
         for (let j = 0; j < filters.length; j++) {
       if (item.filterCategory === filters[i] && item.filterBrand === filters[j]) {
         filtered.push(item);
       }
    }
     }
    })
    return filtered;
}

document.getElementById('filter-btn').addEventListener('change', function() {
  const filtersMenu = document.querySelector('.filters-menu');
  if (this.checked) {
    filtersMenu.classList.add('filters-menu-active');
  } else {
    filtersMenu.classList.remove('filters-menu-active');
  }
});

const sortByPriceBtn = document.querySelector('.sort-price');

sortByPriceBtn.addEventListener('click', () => {
  if (sortByPriceBtn.classList.contains('fa-sort-amount-up')) {
    sortByPriceBtn.classList.replace(
      'fa-sort-amount-up',
      'fa-sort-amount-down'
    );
    renderer('priceMax');
  } else {
    sortByPriceBtn.classList.replace(
      'fa-sort-amount-down',
      'fa-sort-amount-up'
    );
    renderer('priceMin');
  }
});

const sortByBrandBtn = document.querySelector('.sort-brand');

sortByBrandBtn.addEventListener('click', () => {
  if (sortByBrandBtn.classList.contains('fa-sort-alpha-up')) {
    sortByBrandBtn.classList.replace(
      'fa-sort-alpha-up',
      'fa-sort-alpha-down'
    );
    renderer('brandMax');
  } else {
    sortByBrandBtn.classList.replace(
      'fa-sort-alpha-down',
      'fa-sort-alpha-up'
    );
    renderer('brandMin');
  }
});

document.querySelector('.filter-search').addEventListener('keyup', itemSearch);

renderer();

function sortOptions(sort, products) {
  if (sort === 'priceMin') {
    products.sort((a, b) => a.price - b.price);
  }
  if (sort === 'priceMax') {
    products.sort((a, b) => b.price - a.price);
  }
  if (sort === 'brandMax') {
    products.sort(function(a, b) {
      const x = a.brand.toLowerCase();
      const y = b.brand.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  }
  if (sort === 'brandMin') {
    products.sort(function(a, b) {
      const x = a.brand.toLowerCase();
      const y = b.brand.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
  }
}

const productsContainer = document.querySelector('.product-items');

function clearProductList() {
  while (productsContainer.hasChildNodes()) {
    productsContainer.removeChild(productsContainer.firstChild);
  }
}

function sortProduct() {
  renderProducts();
}

function renderProducts(products) {
  let productRowContents = '';
  products.forEach(product => {
    productRowContents += `
                  <div class="product-item" data-filter="${product.category} ${product.brand} ${product.model}" data-price="${product.price}" data-id=${product.id}>
                    <div class="product-img-container">
                        <img class="product-img" src="images/products/${product.imgName}" alt="${product.category} - ${product.brand} - ${product.model}">
                    </div>
                    <div class="product-descr">
                        <p class="product-category">${product.category}</p>
                        <p class="product-brand">${product.brand}</p>
                        <p class="product-model">${product.model}</p>
                    </div>
                    <div class="buttons">
                        <span class="product-price">$${product.price}</span>
                        <i class="fas fa-cart-plus product-add-cart"></i>
                    </div>
                  </div>`;
  });
  productsContainer.innerHTML = productRowContents;
}

function addEventListeners() {
  document
    .querySelectorAll('.product-add-cart')
    .forEach(item => item.addEventListener('click', addToCart));
}

document
  .querySelector('.cart-purchase-button')
  .addEventListener('click', purchaseComplete);

function purchaseComplete() {
  saveCart();
  console.log(localStorage)
  fetch('order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          localStorage
        })
    });
  alert('Дякуємо за покупку в нашому магазині!');
  const cartItems = document.querySelector('.cart-items');
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeElement(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const quantityInput = event.target;
  if (isNaN(quantityInput.value) || quantityInput.value < 1) {
    quantityInput.value = 1;
  }
  updateCartTotal();
}

function addToCart(event) {
  const addProduct = event.target;
  const productItem = addProduct.parentElement.parentElement;
  const productImageSrc = productItem.getElementsByClassName('product-img')[0]
    .src;
  const productImageAlt = productItem.getElementsByClassName('product-img')[0]
    .alt;
  const productBrand = productItem.getElementsByClassName('product-brand')[0]
    .innerText;
  const productModel = productItem.getElementsByClassName('product-model')[0]
    .innerText;
  const productPrice = productItem.getElementsByClassName('product-price')[0]
    .innerText;
  const productId = productItem.dataset.id;
  addProductToCart(
    productImageSrc,
    productImageAlt,
    productBrand,
    productModel,
    productPrice,
    productId
  );
  updateCartTotal();
}

function addProductToCart(imageSrc, imageAlt, brand, model, price, id) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelector('.cart-items');
  const cartItemNames = document.getElementsByClassName('cart-item-model');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === model) {
      alert('Цей продукт вже є у Вашому кошику!');
      return;
    }
  }
  const cartRowContents = `
        <div class="cart-item cart-column" data-id="${id}">
            <img class="cart-item-image" src="${imageSrc}" alt="${imageAlt}" width="100" height="100">
            <div class="cart-item-descr">
                <p class="cart-item-brand">${brand}</p>
                <p class="cart-item-model">${model}</p>
            </div>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <i class="fas fa-minus cart-item-remove"></i>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .querySelector('.cart-item-remove')
    .addEventListener('click', removeElement);
  cartRow
    .querySelector('.cart-quantity-input')
    .addEventListener('change', quantityChanged);
}

function saveCart() {
    const productIds = []
    const quantityValue = []
    document.querySelectorAll('.cart-item')
      .forEach((item, index) => {
          productIds.push(item.dataset.id);
          const input = document.querySelectorAll('.cart-quantity-input')[index];
          quantityValue.push(input.value);
        })
    const quantityResult = quantityValue.join();
    const idsResult = productIds.join();
    localStorage['cart'] = idsResult + " quantity: " + quantityResult;
}

function updateCartTotal() {
  const cartItem = document.querySelector('.cart-items');
  const cartRows = cartItem.getElementsByClassName('cart-row');
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.querySelector('.cart-price');
    const quantityElement = cartRow.querySelector('.cart-quantity-input');
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.querySelector('.cart-total-price').innerText = '$' + total;
}

function itemSearch() {
  searchInput = document.querySelector('.filter-search');
  searchText = searchInput.value.toUpperCase();
  const productItem = document.querySelectorAll('.product-item');
  productItem.forEach(item => {
    const productModel = item.querySelector('.product-model').innerText;
    const productBrand = item.querySelector('.product-brand').innerText;
    const productSearch = productBrand + ' ' + productModel;
    if (productSearch.toUpperCase().indexOf(searchText) > -1) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}