import {exibe, load} from "./appendJogos.js"
import { getFavoritos, listener } from "./favoritos.js";
import { filtrar } from "./getJogos.js";
exibe();

const bttCarrega = document.getElementById("carregaMais")
bttCarrega.addEventListener('click',async function(){
  let wait = await load();
  listener();
})

const pesquisar = document.querySelectorAll(".search");
pesquisar.forEach(filtro => {
  filtro.addEventListener('click', function(){
    let idFiltro  = filtro.id;
    if(idFiltro != 'favoritos'){
      if(idFiltro == 'home' || idFiltro == 'logo'){
        let favoritos = getFavoritos();
        filtrar(favoritos)
      }else{
        filtrar(`games?category=${idFiltro}`);
      }
    }
    exibe(true);
  })
});
