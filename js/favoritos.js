import { exibe } from './appendJogos.js'


let contadorFav = 0

export function getFavoritos() {
  return JSON.parse(localStorage.getItem('fav') || '[]')
}

export async function listener() {
  await exibe()
  atualizaFavoritos()
  let stars = document.querySelectorAll('.star')
  stars.forEach(function (star) {
    if (stars.length <= 11 || stars.length - contadorFav <= 10) {
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
    contadorFav++
  })
  contadorFav = 0
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
