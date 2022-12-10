import { exibe } from "./appendJogos.js";
import { consultaJogos } from "./getJogos.js";

const wait = await exibe();
const root = document.getElementById("conteudo-main");
const banner = document.getElementById("banner");

const favs = document.getElementById("favoritos");
const unfillStar = document.querySelectorAll(".star");
atualizaFavoritos();

favs.addEventListener('click', function(){
    banner.removeChild(banner.lastChild);
    while (root.firstChild) {
        root.removeChild(root.lastChild);
    }
    let favoritos = JSON.parse(localStorage.getItem("fav") || '[]');
    exibe(favoritos);
})

unfillStar.forEach(function(star){
    star.addEventListener('click',function(){
        let divRoot = star.parentNode.parentNode.parentNode.parentNode;
        divRoot = divRoot.id
        if(star.classList.contains('starfill')){
            star.classList.remove('starfill');
            console.log(divRoot)
            atualizaFavoritos(divRoot, true)
        }else{
            star.classList.add('starfill');
            atualizaFavoritos(divRoot)
        }
    })   
})
    
function atualizaFavoritos(id=null, rm=false){
    let favoritos = JSON.parse(localStorage.getItem("fav") || '[]');
    if (id == null || rm){
        let x = 0
        favoritos.forEach(function(fav){
            if(rm){
                console.log(fav.id)
                if(fav.id == id){
                    favoritos.splice(x,1)
                }
                x++;
            }else{
                let jogoFav= document.getElementById(fav.id);
                if(jogoFav){
                    let star = jogoFav.querySelector(".star")
                    star.classList.add("starfill");
                }
            }
        })
    }else{
        favoritos.push({id: id});
    }
    localStorage.setItem("fav", JSON.stringify(favoritos));        
}



