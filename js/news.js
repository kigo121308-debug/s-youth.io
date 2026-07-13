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

    render();

});

function render(){

    newsList.innerHTML = "";

    const filtered = currentCategory === "all"
        ? newsData
        : newsData.filter(item => item.category === currentCategory);

    const start = (currentPage - 1) * perPage;

    const end = start + perPage;

    filtered.slice(start,end).forEach(item=>{

        newsList.innerHTML += `

        <a href="${item.url}" class="news-card">

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

function createPagination(total){

    pagination.innerHTML="";

    const pageCount = Math.ceil(total / perPage);

    for(let i=1;i<=pageCount;i++){

        pagination.innerHTML +=

        `<button
        class="${i===currentPage?"active":""}"
        onclick="goPage(${i})">

        ${i}

        </button>`;

    }

}

function goPage(page){

    currentPage = page;

    render();

}

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        currentCategory = button.dataset.category;

        currentPage = 1;

        render();

    });

});