'use strict';

const newsList = document.getElementById("news-list");
const pagination = document.getElementById("pagination");
const buttons = document.querySelectorAll(".category button");

const perPage = 5;

let newsData = [];
let currentPage = 1;
let currentCategory = "all";

fetch("data/news.json")
.then(response => response.json())
.then(data => {

    newsData = data;

    // 構造化データを生成
    createNewsStructuredData(newsData);

    render();

});


/* =========================
   ニュース一覧
========================= */

function render(){

    newsList.innerHTML = "";

    const filtered = currentCategory === "all"
        ? newsData
        : newsData.filter(item => item.category === currentCategory);

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    filtered.slice(start, end).forEach(item => {

        newsList.innerHTML += `

        <a href="${item.url}" class="news-card" target="_blank">

            <img src="${item.image}" alt="">

            <div class="content">

                <p class="date">${item.date}</p>

                <h3>${item.title}</h3>

                <span class="more">
                    詳細を見る →
                </span>

            </div>

        </a>

        `;

    });

    createPagination(filtered.length);

}


/* =========================
   ページネーション
========================= */

function createPagination(total){

    pagination.innerHTML = "";

    // 5件以下ならページネーションを表示しない
    if(total <= perPage){

        pagination.style.display = "none";

        return;

    }

    // 6件以上なら表示
    pagination.style.display = "flex";

    const pageCount = Math.ceil(total / perPage);

    for(let i = 1; i <= pageCount; i++){

        pagination.innerHTML += `
        <button
            class="${i === currentPage ? "active" : ""}"
            onclick="goPage(${i})">
            ${i}
        </button>`;

    }

}


/* =========================
   ページ切り替え
========================= */

function goPage(page){

    currentPage = page;

    render();

}


/* =========================
   カテゴリー切り替え
========================= */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category;

        currentPage = 1;

        render();

    });

});


/* =========================
   構造化データ生成
========================= */

function createNewsStructuredData(data){

    const itemList = {

        "@context": "https://schema.org",

        "@type": "ItemList",

        "@id": "https://s-youth.jp/news.html#itemlist",

        "name": "ニュース・活動報告",

        "url": "https://s-youth.jp/news.html",

        "numberOfItems": data.length,

        "itemListElement": data.map((item, index) => {

            let url = item.url;

            /*
             * 相対URLの場合、
             * https://s-youth.jp/ を付けて絶対URLにする
             */

            if(!url.startsWith("http")){

                url = new URL(
                    url,
                    "https://s-youth.jp/"
                ).href;

            }

            /*
             * 2026.08.05
             * ↓
             * 2026-08-05
             */

            const datePublished =
                item.date.replace(/\./g, "-");

            return {

                "@type": "ListItem",

                "position": index + 1,

                "name": item.title,

                "url": url,

                "item": {

                    "@type": "Thing",

                    "name": item.title,

                    "datePublished": datePublished

                }

            };

        })

    };


    /*
     * 既に存在している場合は削除
     * （二重生成防止）
     */

    const oldScript =
        document.getElementById(
            "news-itemlist-structured-data"
        );

    if(oldScript){

        oldScript.remove();

    }


    /*
     * JSON-LDを作成
     */

    const script =
        document.createElement("script");

    script.type =
        "application/ld+json";

    script.id =
        "news-itemlist-structured-data";

    script.textContent =
        JSON.stringify(itemList);

    document.head.appendChild(script);

}