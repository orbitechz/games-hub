import { exibe } from './appendJogos.js'
import { filtrar, consultaJogos } from './getJogos.js'

let contadorFav = 0

export function getFavoritos() {
  return JSON.parse(localStorage.getItem('fav') || '[]')
}

export async function listener(fav=0) {
  atualizaFavoritos()
  if(fav!=0){
    console.log("ta certo")
    let jogoFav = document.getElementById(fav);
    let star = jogoFav.querySelector(".star");
    alteraFavorito(star);
  }else{
    console.log("ALERTA")
    let stars = document.querySelectorAll('.star')
    stars.forEach(function (star) {
      if (stars.length <= 11 || stars.length - contadorFav <= 10) {
        alteraFavorito(star)
      }
      contadorFav++
    })
    contadorFav = 0
  }
}

function alteraFavorito(star){
  star.addEventListener('click', function () {
    let divRoot = star.parentNode.parentNode.parentNode.parentNode
    divRoot = divRoot.id
    if (star.classList.contains('starfill')) {
      star.classList.remove('starfill')
      atualizaFavoritos(divRoot, true)
    } else {
      star.classList.add('starfill')
      atualizaFavoritos(divRoot)
    }
  })
}

function atualizaFavoritos(id = null, rm = false) {
  let favoritos = getFavoritos()
  if (id == null || rm) {
    let x = 0
    favoritos.forEach(function (fav) {
      if (rm) {
        if (fav.id == id) {
          favoritos.splice(x, 1)
        }
        x++
      } else {
        let jogoFav = document.getElementById(fav.id)
        if (jogoFav) {
          let star = jogoFav.querySelector('.star')
          star.classList.add('starfill')
        }
      }
    })
  } else {
    favoritos.push({ id: id })
  }
  localStorage.setItem('fav', JSON.stringify(favoritos))
}
const titulo = document.getElementById('category')
const bttFav = document.getElementById('favoritos')
bttFav.addEventListener('click', async function () {
  document.getElementById('carregaMais').style.visibility = "hidden";
  let favoritos = getFavoritos()
  titulo.innerText = "Meus Favoritos"
  const container = document.getElementById('conteudo-main');
  const jogoBanner = document.querySelector('.banner');
  
  if (jogoBanner) {
    jogoBanner.remove()
  }
  while (container.firstChild) {
    container.removeChild(container.lastChild)
  }
  if(favoritos.length == 0){    
    container.insertAdjacentHTML("beforeend", "<h1 class='alerta'>Você não adicionou nenhum favorito!<h1>")
  }else{
    favoritos.forEach(async favorito => {
      if (favorito.id != 0) {
        filtrar(`game?id=${favorito.id}`)
        let jogo = await consultaJogos();
        await exibe(false, jogo)
        listener(jogo.id);
      }
    })  
    
    const filtros = document.querySelectorAll('.filtro')
    filtros.forEach(filtro => {
      filtro.classList.remove('selecionado')
    })
  }
})
