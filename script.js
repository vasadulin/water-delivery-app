const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout');
let cart = [];

// Мок-данные (будут заменены на запрос к серверу)
const mockProducts = [
  { name: "Пустая бутылка 19л", price: 100 },
  { name: "Помпа для бутылки", price: 300 },
  { name: "Вода с заменой 19л", price: 200 },
  { name: "Полная бутылка 19л", price: 250 }
];

// Загрузка товаров (пока мок)
function loadProducts() {
  productList.innerHTML = '';
  mockProducts.forEach(product => {
    const button = document.createElement('button');
    button.className = 'product';
    button.textContent = `${product.name} - ${product.price} грн`;
    button.addEventListener('click', () => {
      cart.push(product);
      updateCart();
    });
    productList.appendChild(button);
  });
}

// Обновление корзины с кнопкой удаления
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} грн <button class="remove-btn" data-index="${index}">Удалить</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalPrice.textContent = `${total} грн`;
  checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Проверка формы и активация оплаты
checkoutButton.addEventListener('click', () => {
  const address = document.getElementById('delivery-address').value;
  const time = document.getElementById('delivery-time').value;
  if (!address || !time || cart.length === 0) {
    alert('Заполните адрес, время и добавьте товары!');
  } else {
    alert(`Заказ оформлен!\nАдрес: ${address}\nВремя: ${time}\nСумма: ${totalPrice.textContent}`);
    // Здесь будет интеграция с оплатой и бэкендом
  }
});

// Инициализация
loadProducts();