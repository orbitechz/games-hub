import {exibe, load, teste} from "./appendJogos.js"
exibe();

const bttCarrega = document.getElementById("carregaMais")
bttCarrega.addEventListener('click',function(){
  load()
})
