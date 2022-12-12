import { exibe, load } from './appendJogos.js'
import { getFavoritos, listener } from './favoritos.js'
import { filtrar } from './getJogos.js'

const wait = await exibe()
listener()

const titulos = {
  home: 'Mais Jogados',
  shooter: 'Jogos de Tiro',
  mmofps: 'MMFOPS',
  racing: 'Corrida',
  space: 'Espaço',
  card: 'Jogos de Cartas',
  sandbox: 'Mundo Aberto',
  strategy: 'Estratégia',
  horror: 'Terror'
}
const titleCategory = document.getElementById('category')
const bttCarrega = document.getElementById('carregaMais')
bttCarrega.addEventListener('click', function () {
  load()
  listener()
})

const filtros = document.querySelectorAll('.filtro')
filtros.forEach(filtro => {
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
    listener()
    titleCategory.innerHTML = titulos[idFiltro];
  })
})
