import { consultaJogos } from './getJogos.js';

let qntd = 10;
let qntdExibido = 0;

const container = document.getElementById('conteudo-main');
const banner = document.getElementById('banner');

export async function exibe(reset=false, game=null, retorna=false) { // Exibe jogos na pagina
    // PARAMETROS
    // reset == true -> Antes de exibir os jogos, apaga os anteriores
    // game -> jogo, ou jogos, a ser(em) exibidos
    // retorna -> apenas para fim de assincronidade
    if(retorna){
        return await consultaJogos();
    }else{
        let games;
        let fav = false;
        if(reset){
            const jogoBanner = document.querySelector(".banner");
            qntd = 10;
            qntdExibido = 0;
            if(jogoBanner){ // Remove da tela o banner
                jogoBanner.remove();
            }
            while (container.firstChild) { // Remove da tela todos os jogos em exibicao
                container.removeChild(container.lastChild);
            }
        }
        if(game==null){ // Caso nao foi passado nenhum jogo, consultar na API com o filtro atual.
            games = await consultaJogos();
        }else{
            games = game; // Se foi passado o jogo como parametro, guardar na variavel games
            fav = true; // Informa que eh favorito
        }
    
        if(fav){ // Caso especial para os jopgos favoritos, pois os mesmos são passados individualmente
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

        }else{ // Caso especial de jogos vindos da API, quie são tratados como array
            for (qntdExibido; qntdExibido < qntd + 1; qntdExibido++) {
                if (qntdExibido == games?.length || games?.length == undefined) { // Quando acabar os jogos, cortar o loop e esconder o botao de carregar mais
                    if(games?.length == undefined){ // Se o array estiver vazio, pois nao tem jogos para o filtro selecionado, exibe um alerta.
                        container.insertAdjacentHTML(
                            'beforeend',
                            "<h1 class='alerta'>Não temos jogos para estes filtros!<h1>"
                        );
                    }
                    document.getElementById('carregaMais').style.visibility = "hidden";
                    break;
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
}

export function load() { // funcao para exibir mais 10 jogos na tela
  qntd += 10;
  return exibe();
}
