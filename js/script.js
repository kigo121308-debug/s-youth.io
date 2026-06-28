'use strict';

//ハンバーガーメニュー
const ham = document.querySelector("#js_ham");
const nav = document.querySelector("#js_nav");

ham.addEventListener('click', function() {
  ham.classList.toggle('active');
  nav.classList.toggle('active');
});
//ハンバーガーメニューここまで
