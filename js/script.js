'use strict';

//ハンバーガーメニュー
const ham = document.querySelector("#js_ham");
const nav = document.querySelector("#js_nav");

ham.addEventListener('click', function() {
  ham.classList.toggle('active');
  nav.classList.toggle('active');
});
//ハンバーガーメニューここまで

const header = document.querySelector(".header");

const touchDevice = window.matchMedia("(hover: none)").matches;

if (touchDevice) {

  header.addEventListener("click", function(e){

    // ナビ内部クリックでは閉じない
    if(e.target.closest(".header_nav")){
      return;
    }

    header.classList.toggle("open");

  });


  // 外側クリックで閉じる
  document.addEventListener("click", function(e){

    if(!header.contains(e.target)){
      header.classList.remove("open");
    }

  });

}
