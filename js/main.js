import {exibe, load} from "./appendJogos.js"
import { listener } from "./favoritos.js";
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
    filtrar(idFiltro);
  })
});
