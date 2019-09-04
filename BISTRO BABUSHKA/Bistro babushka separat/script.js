document.addEventListener("DOMContentLoaded", start);

let menuliste = [];
let filter = "alle";
let filterknapper = document.querySelectorAll("nav button");
const skabelon = document.querySelector("template").content;
const liste = document.querySelector("#liste");

function start() {
    hentData();
    filterknapper.forEach(knap => knap.addEventListener("click", filtrer));
}

function filtrer() {
    document.querySelector(".valgt").classList.remove("valgt");

    this.classList.add("valgt");

    filter = this.dataset.kategori;

    visData();
}

async function hentData() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    menu = await jsonData.json();
    visData();
}

function visData() {
    liste.textContent = "";

    menu.feed.entry.forEach(menu => {
        if (menu.gsx$kategori.$t == filter || filter == "alle") {
            const klon = skabelon.cloneNode(true);

            klon.querySelector("img").src = `imgs/small/${menu.gsx$billede.$t}-sm.jpg`;

            klon.querySelector("img").alt = menu.gsx$navn.$t;

            klon.querySelector("h2").textContent = menu.gsx$navn.$t;
            klon.querySelector(".kort").textContent = menu.gsx$kort.$t;

            klon.querySelector(".pris").textContent = menu.gsx$pris.$t;

            liste.appendChild(klon);

            liste.lastElementChild.addEventListener("click", () => {
                location.href = `separat.html?id=${menu.gsx$id.$t}`;
            });

        }
    })
}
