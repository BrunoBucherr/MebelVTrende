function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " добавлен в корзину!");
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartList = document.getElementById("cartList");
  let totalSpan = document.getElementById("total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString("ru-RU")} ₸`;

    // кнопка удаления
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Удалить";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    };

    li.appendChild(removeBtn);
    cartList.appendChild(li);

    total += item.price;
  });

  totalSpan.textContent = total.toLocaleString("ru-RU");

  // пересчёт при изменении доставки
  document.querySelectorAll("input[name='delivery']").forEach(radio => {
    radio.addEventListener("change", updateDelivery);
  });
  let distanceInput = document.getElementById("distance");
  if (distanceInput) {
    distanceInput.addEventListener("input", updateDelivery);
  }

  updateDelivery();
}

function updateDelivery() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  let delivery = document.querySelector("input[name='delivery']:checked").value;

  if (delivery === "kostanay") {
    total += 2000;
  } else if (delivery === "other") {
    let km = parseInt(document.getElementById("distance").value) || 0;
    total += km * 250;
  }

  document.getElementById("total").textContent = total.toLocaleString("ru-RU");
}

// показать заказ на странице order.html
function renderOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let list = document.getElementById("orderList");
  let totalEl = document.getElementById("orderTotal");

  if (!list || !totalEl) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString("ru-RU")} ₸`;
    list.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toLocaleString("ru-RU");
}

// обработка формы заказа
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("order.html")) {
    renderOrder();

    let form = document.getElementById("orderForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let phone = document.getElementById("phone").value;
      let address = document.getElementById("address").value;

      alert(`Спасибо за заказ!\nИмя: ${name}\nТелефон: ${phone}\nАдрес: ${address}`);

      localStorage.removeItem("cart"); // очищаем корзину
      window.location.href = "index.html"; // возвращаем на главную
    });
  }
});
