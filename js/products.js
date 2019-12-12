const removeCartItemButtons = document.getElementsByClassName('cart-item-remove');
for (let i = 0; i < removeCartItemButtons.length; i++) {
  const button = removeCartItemButtons[i];
  button.addEventListener('click', removeElement);
}

const quantityInputs = document.getElementsByClassName('cart-quantity-input');
for (let i = 0; i < quantityInputs.length; i++) {
  const quantityInput = quantityInputs[i];
  quantityInput.addEventListener('change', quantityChanged);
}

const addToCartButtons = document.getElementsByClassName('product-add-cart');
for (let i = 0; i < addToCartButtons.length; i++) {
  const addToCartButton = addToCartButtons[i];
  addToCartButton.addEventListener('click', addToCart);
}

document
  .getElementsByClassName('cart-purchase-button')[0]
  .addEventListener('click', purchaseComplete);

function purchaseComplete() {
  alert('Дякуємо за покупку в нашому магазині!');
  const cartItems = document.getElementsByClassName('cart-items')[0];
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
  const productTitle = productItem.getElementsByClassName('product-name')[0]
    .innerText;
  const productPrice = productItem.getElementsByClassName('product-price')[0]
    .innerText;
  addProductToCart(productImageSrc, productTitle, productPrice);
  updateCartTotal();
}

function addProductToCart(imagesrc, title, price) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.getElementsByClassName('cart-items')[0];
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
    .getElementsByClassName('cart-item-remove')[0]
    .addEventListener('click', removeElement);
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  const cartItem = document.getElementsByClassName('cart-items')[0];
  const cartRows = cartItem.getElementsByClassName('cart-row');
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;
}