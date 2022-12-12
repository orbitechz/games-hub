import { consultaJogos, filtrar } from './getJogos.js';

let qntd = 10
let qntdExibido = 0
const container = document.getElementById('conteudo-main')
const banner = document.getElementById('banner');
export async function exibe(reset=false) {
    if(reset){
        const jogoBanner = document.querySelector(".banner")
        qntd = 10;
        qntdExibido = 0;
        jogoBanner.remove();
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    }
    let games;
    games = await consultaJogos();
    console.log(games);
    for (qntdExibido; qntdExibido < qntd + 1; qntdExibido++) {
        if (qntdExibido == games.length) {
            break
        }
        let conteudo =  `
        <div class="image banner" id="${games[qntdExibido].id}">
            <img src="${games[qntdExibido].thumbnail}" alt="" />
            <div class="details">
                <h2>${games[qntdExibido].title}</h2>
                <div class="more">
                <div class="short-disc">
                <a href="${games[qntdExibido].freetogame_profile_url}" target="_blank" class="read-more"><p class="short">${games[qntdExibido].short_description}</p></a>
                </div>
                <div class="icons">
                    <span class="star"><i class="bi bi-star-fill"></i></span>
                </div>
                </div>
            </div>
            </div>
        `
        if (qntdExibido == 0) {
            banner.insertAdjacentHTML('afterbegin',conteudo);
        } else {
            container.insertAdjacentHTML('beforeend', conteudo);
        }
    }
}

export function load() {
  qntd += 10;
  exibe()
}
