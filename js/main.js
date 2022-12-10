import {exibe, load} from "./appendJogos.js"
exibe();

const bttCarrega = document.getElementById("carregaMais")
bttCarrega.addEventListener('click',function(){
  load()
})
