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
const plataformas = document.querySelectorAll('.plataforma')
const filtros = document.querySelectorAll('.filtro')
const categorias = document.querySelectorAll('.categoria')
filtros.forEach(filtro => {
  filtro.addEventListener('click', function () {
    if (filtro.classList.contains('plataforma')) {
      plataformas.forEach(plataforma => {
        plataforma.classList.remove('selecionado')
      })
      categorias.forEach(categoria => {
        if (categoria.classList.contains('selecionado')) {
          if(categoria.id == "home"){
            filtrar(
              `games?platform=${filtro.id}&sort-by=popularity`
            )
          }else{
            filtrar(
              `games?platform=${filtro.id}&category=${categoria.id}&sort-by=popularity`
            )
          }
        }
      })
    } else if (filtro.classList.contains('categoria')) {
      categorias.forEach(categoria => {
        categoria.classList.remove('selecionado')
      })
      plataformas.forEach(plataforma => {
        if (plataforma.classList.contains('selecionado')) {
          if(filtro.id =="home"){
            filtrar(
              `games?platform=${plataforma.id}&sort-by=popularity`
            )
          }else{
            filtrar(
              `games?platform=${plataforma.id}&category=${filtro.id}&sort-by=popularity`
            )
          }
        }
      })
    }
    filtro.classList.add('selecionado')

    exibe(true)
    listener()
    categorias.forEach(categoria => {
      if (categoria.classList.contains('selecionado')) {
        titleCategory.innerHTML = titulos[categoria.id]
      }
    });
  })
})
