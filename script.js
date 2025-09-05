// Храним корзину в localStorage (чтобы не пропадала при переходе между страницами)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Добавить товар в корзину
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " добавлен в корзину!");
}

// Показать корзину
function renderCart() {
  let list = document.getElementById("cartList");
  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.name + " — " + item.price + " ₸";
    list.appendChild(li);
    total += item.price;
  });

  document.getElementById("total").textContent = total;
}

// Подтверждение заказа
function confirmOrder(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let delivery = document.querySelector('input[name="delivery"]:checked').value;

  document.getElementById("result").textContent =
    `Спасибо, ${name}! Ваш заказ (${delivery}) оформлен. Мы свяжемся с вами по телефону ${phone}.`;

  // Очистка корзины
  cart = [];
  localStorage.removeItem("cart");
}
