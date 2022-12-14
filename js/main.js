import { exibe, load } from './appendJogos.js'
import { getFavoritos, listener } from './favoritos.js'
import { filtrar } from './getJogos.js'

await exibe(); // Exibe pela primeira vez
listener(); // Adiciona os primeiros event listeners

const titulos = { // Titulo a ser exibido para cada situacao de filtragem
  home: 'Mais Jogados',
  shooter: 'Jogos de Tiro',
  mmofps: 'MMFOPS',
  racing: 'Corrida',
  space: 'Espaço',
  card: 'Jogos de Cartas',
  sandbox: 'Mundo Aberto',
  strategy: 'Estratégia',
  horror: 'Terror',
  pc : 'PC',
  browser: 'Browser',
  all: 'Todos'
};

// ======================================================================
const titleCategory = document.getElementById('category');
const bttCarrega = document.getElementById('carregaMais');

const catHome = document.getElementById("home");; // Home
const platAll = document.getElementById("all"); // Todas as plataformas

const filtros = document.querySelectorAll('.filtro'); // Categorias e Plataformas
const plataformas = document.querySelectorAll('.plataforma'); // Plataformas
const categorias = document.querySelectorAll('.categoria'); // Categorias
const bttFav = document.getElementById('favoritos'); // Favoritos
// ======================================================================

bttCarrega.addEventListener('click', async function () {
  await load(); // Carrega mais 10 jogos
  listener(); // adiciona event listener aos novos jogos
})

// =========================================================================

filtros.forEach(filtro => {
  filtro.addEventListener('click', async function () {
    if (bttCarrega.style.visibility == 'hidden'){ // Se o botao Carrega Mais estiver escondido, mostrar o mesmo
      bttCarrega.style.visibility = "visible";
    }
    if(bttFav.classList.contains("selecionado")){ // Se o botao Favoritos estiver selecionado, retira a seleção
      bttFav.classList.remove("selecionado");
    }

    let contCategorias = 0; //Contador para checar se alguma categoria esta selecionada
    let contPlataformas = 0; //Contador para checar se alguma plataforma esta selecionada

    if (filtro.classList.contains('plataforma')) { // Se o filtro selecionado for uma plataforma
      plataformas.forEach(plataforma => {
        plataforma.classList.remove('selecionado'); // Remove a marcacao das outras plataformas
      })
      categorias.forEach(categoria => { // Verifica se alguma categoria está selecionada, para cruzar os filtros
        if (categoria.classList.contains('selecionado')) {
          if(categoria.id == "home"){ // Se for a Home, filtra apenas pela plataforma escolhida por mais populares
            filtrar(
              `games?platform=${filtro.id}&sort-by=popularity`
            );
          }else{ // Filtra pela categoria escolhida na plataforma escolhida
            filtrar(
              `games?platform=${filtro.id}&category=${categoria.id}&sort-by=popularity`
            );
          }
        }else{contCategorias++;} // Conta quantas categorias nao estao selecionadas
        if(contCategorias >= 9){ // Se nenhuma estiver selecionada, seleciona automaticamente a Home
          filtrar(
            `games?platform=all&sort-by=popularity`
          );
          catHome.classList.add("selecionado");
        }
      })
    } else if (filtro.classList.contains('categoria')) { // Se o filtro selecionado for uma categoria
      categorias.forEach(categoria => {
        categoria.classList.remove('selecionado'); // Remove a marcacao das outras categorias
      })
      plataformas.forEach(plataforma => { // Verifica se alguma plataforma está selecionada, para cruzar os filtros
        if (plataforma.classList.contains('selecionado')) {
          if(filtro.id =="home"){ // Se for a Home, filtra apenas pela plataforma escolhida por mais populares
            filtrar(
              `games?platform=${plataforma.id}&sort-by=popularity`
            );
          }else{
            filtrar( // Filtra pela categoria escolhida na plataforma escolhida
              `games?platform=${plataforma.id}&category=${filtro.id}&sort-by=popularity`
            );
          }
        }else{contPlataformas++;} // Conta quantas plataformas nao estao selecionadas
        if(contPlataformas >= 3){ // Se nenhuma estiver selecionada, seleciona automaticamente Todas as Plataformas
          if(filtro.id =="home"){
            filtrar(
              `games?platform=${plataforma.id}&sort-by=popularity`
            );
          }else{
            filtrar(
              `games?category=${filtro.id}&plataform=all&sort-by=popularity`
            );
          }
          platAll.classList.add("selecionado") ;
        }
      })
    }
    filtro.classList.add('selecionado'); // Marca a opcao selecionada

    await exibe(true); // Exibe conforme os filtros
    listener(); // Adiciona event listener para os exibidos

    categorias.forEach(categoria => {
      if (categoria.classList.contains('selecionado')) { // Descobre qual categoria esta selecionada
        plataformas.forEach(plataforma => {
          if (plataforma.classList.contains('selecionado')) { // Descobre qual plataforma esta selecionada
            titleCategory.innerHTML = `${titulos[categoria.id]} | ${titulos[plataforma.id]}`; // Exibe um titulo conforme a categoria e plataforma desejada
        };
      })
    }});
  })
})
