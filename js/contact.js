'use strict';

const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const submitButton = form.querySelector("button");
  submitButton.disabled = true;
  submitButton.textContent = "送信中...";

  const formData = new FormData(form);

  try {

    const response = await fetch("https://script.google.com/macros/s/AKfycbxrO0LXkiCetT0-uKl2oFvp2WuvwHxAw75qAzbPTeyILnU8H2AWKIP0R04ktqthMUMsvA/exec", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
    form.reset();
    modal.showModal();

  } else {
    alert("送信に失敗しました。");
  }

  } catch (error) {
    alert("通信エラーが発生しました。");
    console.error(error);
  }

  submitButton.disabled = false;
  submitButton.innerHTML = "送信する";

});

// モーダルを閉じる
closeModal.addEventListener("click", () => {

    modal.close();

});

modal.addEventListener("click", (e) => {

    const rect = modal.getBoundingClientRect();

    if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
    ) {

        modal.close();

    }

});