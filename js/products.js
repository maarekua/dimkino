document.querySelectorAll('.cart-item-remove')
    .forEach(removeButton => removeButton.addEventListener('click', removeElement));

document.querySelectorAll('.cart-quantity-input')
    .forEach(quantityInput => quantityInput.addEventListener('click', quantityChanged));

document.querySelectorAll('.product-add-cart')
    .forEach(addToCartButton => addToCartButton.addEventListener('click', addToCart));

document.querySelector('.cart-purchase-button')
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
  const productImageSrc = productItem.querySelector('.product-img')
    .src;
  const productTitle = productItem.querySelector('.product-name')
    .innerText;
  const productPrice = productItem.querySelector('.product-price')
    .innerText;
  addProductToCart(productImageSrc, productTitle, productPrice);
  updateCartTotal();
}

function addProductToCart(imagesrc, title, price) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.querySelector('.cart-items');
  const cartItemNames = document.getElementsByClassName('cart-item-title');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert('Цей продукт вже є у Вашому кошику!');
      return;
    }
  }
  const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imagesrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
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


//const jsonFile = `{
//    "speakers": [ 
//        {
//            "brand": "Wilson Audio",
//            "model": "Сhronosonic-XVX",
//            "price": 850000,
//            "imgName": "wilson-audio/chronosonic-xvx.jpg"
//        },
//        {
//            "brand": "Wilson Audio",
//            "model": "Alexandria-XLF",
//            "price": 210000,
//            "imgName": "wilson-audio/alexandria-xlf.jpg"
//        },
//        {
//            "brand": "Wilson Audio",
//            "model": "Alexx",
//            "price": 135000,
//            "imgName": "wilson-audio/alexx.jpg"
//        }
//    ]
//}`;
//const data = JSON.parse(jsonFile);
//console.log(data)
//
//
//function addAllProducts() {
//    const productRow = document.createElement('div');
//    productRow.classList.add('product-item');
//    const productItems = document.querySelector('.product-items');
//    data.speakers.forEach(item => {
//        const productRowContents = `
//            <div class="product-img-container"><img class="product-img" src="images/products/${item.imgName}" alt="Акустика - Wilson Audio - Alexandria-XLF"></div>
//            <div class="product-descr">
//                <h3 class="product-category">Акустика</h3>
//                <h3 class="product-name" >${item.brand} - ${item.model}</h3>
//            </div>
//            <div class="buttons">
//                <span class="product-price">$ ${item.price}</span>
//                <i class="fas fa-cart-plus product-add-cart"></i>
//            </div>`;
//        productRow.innerHTML = productRowContents;
//        productItems.append(productRow);
//    })
//}
//
//addAllProducts()
