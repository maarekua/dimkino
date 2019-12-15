document.getElementById('filter-btn').addEventListener('change', function() {
  const filtersMenu = document.querySelector('.filters-menu');
  if (this.checked) {
    filtersMenu.classList.add('filters-menu-active');
  } else {
    filtersMenu.classList.remove('filters-menu-active');
  }
});

//document.querySelector('.filter-search').addEventListener('keyup', itemSearch());

function fetchJson() {
  fetch('json/product-items.json')
    .then(response => response.json())
    .then(data => {
      data.products.forEach(item => {
        const productRow = document.createElement('div');
        productRow.classList.add(
          'product-item',
          item.filterBrand,
          item.filterCategory
        );
        const productItems = document.querySelector('.product-items');
        const productRowContents = `
                  <div class="product-img-container">
                      <img class="product-img" src="images/products/${item.imgName}" alt="${item.category} - ${item.brand} - ${item.model}">
                  </div>
                  <div class="product-descr">
                      <p class="product-category">${item.category}</p>
                      <p class="product-brand">${item.brand}</p>
                      <p class="product-model">${item.model}</p>
                  </div>
                  <div class="buttons">
                      <span class="product-price">$${item.price}</span>
                      <i class="fas fa-cart-plus product-add-cart"></i>
                  </div>`;
        productRow.innerHTML = productRowContents;
        productItems.append(productRow);
        productRow
          .querySelector('.product-add-cart')
          .addEventListener('click', addToCart);
      });
    });
}

fetchJson();

document
  .querySelector('.cart-purchase-button')
  .addEventListener('click', purchaseComplete);

function purchaseComplete() {
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
  addProductToCart(
    productImageSrc,
    productImageAlt,
    productBrand,
    productModel,
    productPrice
  );
  updateCartTotal();
}

function addProductToCart(imageSrc, imageAlt, brand, model, price) {
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
      <div class="cart-item cart-column">
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

$(document).ready(function() {
  $('.filter-by').click(function() {
    const category = $(this).attr('id');
    if (category === 'all') {
      $('.product-item').addClass('hide');
      $('.product-item').removeClass('hide');
    } else {
      $('.product-item').addClass('hide');
      $('.' + category).removeClass('hide');
    }
  });
});

function itemSearch() {
  searchInput = document.querySelector('.filter-search');
  searchText = searchInput.value.toUpperCase();
  const productItem = document.querySelectorAll('.product-item');
  productItem.forEach(item => {
    const productModel = item.querySelector('.product-model');
    const productBrand = item.querySelector('.product-brand');
    const productSearch = productBrand.innerText + ' ' + productModel.innerText;
    if (productSearch.toUpperCase().indexOf(searchText) > -1) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}

//function filterSelection(filterBy) {
//  if (filterBy == 'all') filterBy = '';
//  const productItems = document.getElementsByClassName('product-item');
//  for (let i = 0; i < productItems.length; i++) {
//    filterRemoveClass(productItems[i], "show");
//    if (productItems[i].className.indexOf(filterBy) > -1) filterAddClass(productItems[i], "show");
//  }
//}
//
//function filterAddClass(element, name) {
//  const itemClasses = element.className.split(' ');
//  const showClass = name.split(' ');
//  showClass.forEach(item => {
//    if (itemClasses.indexOf(item) == -1) {
//      element.className += ' ' + item;
//    }
//  });
//}
//
//function filterRemoveClass(element, name) {
//  const itemClasses = element.className.split(' ');
//  const showClass = name.split(' ');
//  for (i = 0; i < showClass.length; i++) {
//    while (itemClasses.indexOf(showClass[i]) > -1) {
//      itemClasses.splice(itemClasses.indexOf(showClass[i]), 1);
//    }
//  }
//  element.className = itemClasses.join(' ');
//}