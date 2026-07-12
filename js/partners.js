'use strict';

const dialog = document.getElementById("partnerDialog");

const dialogImage = document.getElementById("dialogImage");
const dialogName = document.getElementById("dialogName");
const dialogCategory = document.getElementById("dialogCategory");
const dialogDescription = document.getElementById("dialogDescription");
const dialogLink = document.getElementById("dialogLink");

document.querySelectorAll(".partner-card").forEach(card=>{

    card.addEventListener("click",()=>{

        dialogImage.src = card.dataset.image;
        dialogName.textContent = card.dataset.name;
        dialogCategory.textContent = card.dataset.category;
        dialogDescription.textContent = card.dataset.description;
        dialogLink.href = card.dataset.url;

        dialog.showModal();

    });

});

document.querySelector(".close-btn").addEventListener("click",()=>{

    dialog.close();

});

// dialog外クリックで閉じる

dialog.addEventListener("click",(e)=>{

    const rect = dialog.getBoundingClientRect();

    if(
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
    ){
        dialog.close();
    }

});