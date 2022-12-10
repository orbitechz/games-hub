import { jogos } from './getJogos.js'
let games = jogos();
let qntd = 10;
let qntdExibido = 0;

function gridJogos(){
    const container = document.getElementById("conteudo-main");
    // const banner = 
    for(qntdExibido; qntdExibido < qntd; qntdExibido++){
        let imageDiv = document.createElement("div");
        let detailsDiv = document.createElement("div");
        let moreDiv = document.createElement("div");
        let iconsDiv = document.createElement("div");
        let readMore = document.createElement("a");
        let titulo = document.createElement("h2");
        let img = document.createElement("img");
        let spanStar = document.createElement("span");
        let icon = document.createElement("i");

        img.src = games[qntdExibido].thumbnail;
        titulo.innerText = games[qntdExibido].title   
        readMore.innerText = games[qntdExibido].short_description
        icon.className = "bi bi-star-fill"

        imageDiv.classList.add("image");
        imageDiv.id = games[qntdExibido].id;
        detailsDiv.classList.add("details");
        moreDiv.classList.add("more");
        readMore.classList.add("read-more");
        iconsDiv.classList.add("icons");
        spanStar.classList.add("star");
        
        imageDiv.appendChild(img);
        imageDiv.appendChild(detailsDiv);
        detailsDiv.appendChild(titulo);
        detailsDiv.appendChild(moreDiv);
        moreDiv.appendChild(readMore);
        moreDiv.appendChild(iconsDiv);
        iconsDiv.appendChild(spanStar);
        spanStar.appendChild(icon);
        container.appendChild(imageDiv);
    }
}

export function exibe(){
    gridJogos();
}

export function load(){
    qntd+=10;
    gridJogos()

}

export function teste(){
    alert("i")
}