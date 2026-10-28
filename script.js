// Год в подвале обновляется сам
document.getElementById("year").textContent = new Date().getFullYear();

// Короткое всплывающее сообщение внизу экрана
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2500);
}

// Пока настоящих ссылок нет, кнопки и «Смотреть» показывают подсказку.
// Когда появятся ссылки, замените href="#" в index.html на адрес —
// и скрипт перестанет перехватывать клик.
const messages = {
  subscribe: "Ссылка на канал скоро появится 📮",
  video: "Видео скоро будет доступно 🎬",
};

document.querySelectorAll("[data-placeholder]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") !== "#") return;
    event.preventDefault();
    showToast(messages[link.dataset.placeholder]);
  });
});
