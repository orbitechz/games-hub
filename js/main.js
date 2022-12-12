import { exibe, load } from './appendJogos.js'
import { getFavoritos, listener } from './favoritos.js'
import { filtrar } from './getJogos.js'

const wait = await exibe()
listener()

const bttCarrega = document.getElementById('carregaMais')
bttCarrega.addEventListener('click', function () {
  load()
  listener()
})

const pesquisar = document.querySelectorAll('.search')
pesquisar.forEach(filtro => {
  filtro.addEventListener('click', function () {
    let idFiltro = filtro.id
    if (idFiltro != 'favoritos') {
      if (idFiltro == 'home' || idFiltro == 'logo') {
        filtrar()
      } else {
        filtrar(`games?category=${idFiltro}`)
      }
    } else {
      let favoritos = getFavoritos()
      filtrar(favoritos)
    }
    exibe(true)
    listener();
  })
})
