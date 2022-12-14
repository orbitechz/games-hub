import { exibe } from './appendJogos.js';
import { filtrar, consultaJogos } from './getJogos.js';

let contadorFav = 0;

export function getFavoritos() { // RETORNA CONTEUDO DA LOCALSTORAGE (FAVORITOS)
  return JSON.parse(localStorage.getItem('fav') || '[]');
}

export async function listener(fav = 0) { // ADICIONA OS EVENT LISTENER PARA TODAS AS ESTRELAS 
  atualizaFavoritos() ;
  if (fav != 0) {
    let jogoFav = document.getElementById(fav);
    let star = jogoFav.querySelector('.star');
    alteraFavorito(star);
  } else {
    let stars = document.querySelectorAll('.star');
    stars.forEach(function (star) {
      if (stars.length <= 11 || stars.length - contadorFav <= 10); { // LOGICA PARA NAO DUPLICAR EVENT LISTENER
        alteraFavorito(star);
      }
      contadorFav++;
    })
    contadorFav = 0;
  }
}

function alteraFavorito(star) { 
  // ADICIONA EVENTO NAS ESTRELAS, QUANDO CLICADAS -> PEGA ID DO JOGO E MANDA PARA A FUNCAO QUE ATUALIZA O LOCALSTORAGE
  // -> ADICIONA COR DE PREENCHIMENTO SE NAO TIVER SELECIONADA, SE TIVER, RETIRA
  star.addEventListener('click', function () {
    let divRoot = star.parentNode.parentNode.parentNode.parentNode;
    divRoot = divRoot.id;
    if (star.classList.contains('starfill')) {
      star.classList.remove('starfill');
      atualizaFavoritos(divRoot, true);
    } else {
      star.classList.add('starfill');
      atualizaFavoritos(divRoot);
    }
  })
}

function atualizaFavoritos(id = null, rm = false) { // ATUALIZA LOCALSTORAGE
  // Sem parametro -> apenas pesquisa os favoritos, e os procura na pagina para aplicar o estilo visual de selecionado
  // id -> id do jogo a ser ADICIONADO aos favoritos
  // id && rm == true-> id a ser REMOVIDO dos favoritos

  let favoritos = getFavoritos();
  if (id == null || rm) { // Se quiser apenas atualizar os favoritos ou remover algum favorito
    let x = 0;
    favoritos.forEach(function (fav) { 
      if (rm) { // Se recebeu parametro de remover o favorito
        if (fav.id == id) { // Procura e retira o favorito do array
          favoritos.splice(x, 1);
        }
        x++;
      } else { // Caso contrario, apenas pesquisa e aplica o preenchimento dos jogos favoritos
        let jogoFav = document.getElementById(fav.id);
        if (jogoFav) {
          let star = jogoFav.querySelector('.star');
          star.classList.add('starfill');
        }
      }
    })
  } else { // Caso for fornecido o ID, adicionar aos favoritos
    favoritos.push({ id: id });
  }
  localStorage.setItem('fav', JSON.stringify(favoritos)); // Atualizar o localstorage
}

// =======================================================================================

const titulo = document.getElementById('category');
const bttFav = document.getElementById('favoritos');

bttFav.addEventListener('click', async function () { // botao da aba para mostrar os favoritos
  document.getElementById('carregaMais').style.visibility = 'hidden'; // Apaga botao de Carregar Mais
  let favoritos = getFavoritos();
  titulo.innerText = 'Meus Favoritos';
  const container = document.getElementById('conteudo-main');
  const jogoBanner = document.querySelector('.banner');

  if (jogoBanner) { // Remove da tela o jogo do banner
    jogoBanner.remove();
  }
  while (container.firstChild) { // Remove da tela todos os jogos que estao em exibicao
    container.removeChild(container.lastChild);
  }
  if (favoritos.length == 0) { // Caso o usuario nao adicionou favoritos 
    container.insertAdjacentHTML(
      'beforeend',
      "<h1 class='alerta'>Você não adicionou nenhum favorito!<h1>"
    );
  } else {
    favoritos.forEach(async favorito => { // Trata um jogo por vez
      if (favorito.id != 0) {
        filtrar(`game?id=${favorito.id}`); // Cria filtro de Busca 
        let jogo = await consultaJogos(); // Busca as informacoes do jogo na API
        await exibe(false, jogo); // Exibe o jogo
        listener(jogo.id); // Adiciona um listener apenas para o jogo da iteracao 
      }
    })

    const filtros = document.querySelectorAll('.filtro');
    filtros.forEach(filtro => { // Deselecionada todos os filtros
      filtro.classList.remove('selecionado');
    })
  }
})
