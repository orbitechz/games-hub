import { exibe, load } from './appendJogos.js'
import { getFavoritos, listener } from './favoritos.js'
import { filtrar } from './getJogos.js'

await exibe()
listener("inicial")

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
bttCarrega.addEventListener('click', async function () {
  await load()
  listener()
})
const catHome = document.getElementById("home");
const platAll = document.getElementById("all")
const plataformas = document.querySelectorAll('.plataforma')
const filtros = document.querySelectorAll('.filtro')
const categorias = document.querySelectorAll('.categoria')
filtros.forEach(filtro => {
  filtro.addEventListener('click', async function () {
    let contCategorias = 0;
    let contPlataformas = 0;
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
        }else{contCategorias++;}
        if(contCategorias >= 9){
          filtrar(
            `games?platform=all&sort-by=popularity`
          );
          catHome.classList.add("selecionado")
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
        }else{contPlataformas++;}
        if(contPlataformas >= 3){
          if(filtro.id =="home"){
            filtrar(
              `games?platform=${plataforma.id}&sort-by=popularity`
            );
          }else{
            filtrar(
              `games?category=${filtro.id}&plataform=all&sort-by=popularity`
            );
          }
          platAll.classList.add("selecionado")
        }
      })
    }
    filtro.classList.add('selecionado')

    await exibe(true)
    listener(filtro);
    categorias.forEach(categoria => {
      if (categoria.classList.contains('selecionado')) {
        titleCategory.innerHTML = titulos[categoria.id]
      }
    });
  })
})
