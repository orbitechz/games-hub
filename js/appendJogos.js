import { consultaJogos, filtrar } from './getJogos.js';

let qntd = 10
let qntdExibido = 0
const container = document.getElementById('conteudo-main');
const banner = document.getElementById('banner');
export async function exibe(reset=false, game=null, retorna=false) {
    if(retorna){
        return await consultaJogos();
    }else{
        let games;
        let fav = false;
        if(reset){
            const jogoBanner = document.querySelector(".banner")
            qntd = 10;
            qntdExibido = 0;
            if(jogoBanner){
                jogoBanner.remove();
            }
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }
        }
        if(game==null){
            games = await consultaJogos();
        }else{
            games = game;
            fav = true;
            
        }
        console.log(games)
    
        if(fav){
            let conteudo = `<div class="image banner" id="${games.id}">
            <img src="${games.thumbnail}" alt="" />
            <div class="details">
                <h2>${games.title}</h2>
                <div class="more">
                <div class="short-disc">
                <a href="${games.freetogame_profile_url}" target="_blank" class="read-more"><p class="short">${games.short_description}</p></a>
                </div>
                <div class="icons">
                    <span class="star"><i class="bi bi-star-fill"></i></span>
                </div>
                </div>
            </div>
            </div>`
               container.insertAdjacentHTML('beforeend', conteudo);
        }
        
        for (qntdExibido; qntdExibido < qntd + 1; qntdExibido++) {
            if (qntdExibido == games?.length) {
                break
            }
            let conteudo =  `
            <div class="image banner" id="${games[qntdExibido]?.id}">
                <img src="${games[qntdExibido]?.thumbnail}" alt="" />
                <div class="details">
                    <h2>${games[qntdExibido]?.title}</h2>
                    <div class="more">
                    <div class="short-disc">
                    <a href="${games[qntdExibido]?.freetogame_profile_url}" target="_blank" class="read-more"><p class="short">${games[qntdExibido]?.short_description}</p></a>
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
}

export function load() {
  qntd += 10;
  exibe()
}
