'use strict';

const homeNews = document.getElementById("home-news-list");

fetch("data/news.json")
    .then(res => res.json())
    .then(data => {

        // 日付順に並び替え（新しい順）
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 最新5件だけ取得
        const latest = data.slice(0, 5);

        latest.forEach(item => {

            const date = item.date.replaceAll("-", ".");

            const target = item.url.startsWith("http")
                ? 'target="_blank" rel="noopener"'
                : "";

            homeNews.innerHTML += `
                <li>

                    <time datetime="${item.date}">
                        ${date}
                    </time>

                    <p class="category ${item.category}">
                        ${item.category.toUpperCase()}
                    </p>

                    <p>
                        <a href="${item.url}" ${target}>
                            ${item.title}
                        </a>
                    </p>

                </li>
            `;
        });

    })
    .catch(err => console.error(err));