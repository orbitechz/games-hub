import { consultaJogos } from './getJogos.js'
let qntd = 11;
let qntdExibido = 0;
let games;
export async function exibe(filtro="sort-by=popularity"){
    games = new Array;
    const container = document.getElementById("conteudo-main");
    const banner = document.getElementById("banner");
    if(typeof(filtro) == 'object'){
        console.log('sera?')
        filtro.forEach(async function(ids){
            let item = await consultaJogos(`game?id=${ids.id}`)
            games.push(item);
            console.log(games[0].title)
        });
    }else{
        games = await consultaJogos();
    }
    console.log(games)
    console.log(games.length)
        
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
        readMore.href = games[qntdExibido].game_url
        readMore.target = "blank"

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
        if(qntdExibido == 0){
            banner.appendChild(imageDiv);
        }else{
            container.appendChild(imageDiv);
        }

        // if(qntdExibido == games.length){
        //     break;
        // }
    }
}

export function load(){
    qntd+=10;
    exibe()
}