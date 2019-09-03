document.addEventListener("DOMContentLoaded", start)
let menuliste = [];
let filter = "alle";


function start() {
    const filtrerknapper = document.querySelectorAll("nav button");
    filtrerknapper.forEach(knap => knap.addEventListener("click", filtrerMenu));

    document.querySelector("#detalje").style.display = "none";

    hentData();
}

function filtrerMenu() {
    console.log(this);
    document.querySelector(".valgt").classList.remove("valgt");
    filter = this.dataset.kategori;
    this.classList.add("valgt");

    visData();
}

async function hentData() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");

    console.log(jsonData);
    menuliste = await jsonData.json();
    console.log(menuliste);

    visData();
    skjulDetalje();

}

function visData() {
    const skabelon = document.querySelector("template").content;
    const liste = document.querySelector("#liste");

    liste.textContent = "";

    menuliste.feed.entry.forEach(menu => {
        if (menu.gsx$kategori.$t == filter || filter == "alle") {

            const klon = skabelon.cloneNode(true);

            const h2 = klon.querySelector("h2");

            h2.textContent = menu.gsx$navn.$t;

            const kort = klon.querySelector(".kort");

            kort.textContent = menu.gsx$kort.$t;

            const pris = klon.querySelector(".pris");
            pris.textContent = menu.gsx$pris.$t + " kr";


            klon.querySelector("img").src = "imgs/small/" + menu.gsx$billede.$t + "-sm.jpg";

            klon.querySelector(".menu").addEventListener("click", () => {
                location.href = `separat.html?id=${menu.gsx$id.$t}`;

            });


            liste.appendChild(klon);
        }
    })

}

function skjulDetalje() {
    document.querySelector("#detalje").style.display = "none";
}
