let unfillStar = document.querySelectorAll(".star");
let favs = document.querySelector('.fav');


let homeContent = document.querySelector('.main-content');
let favContent = document.querySelector('.favs-content');

for (let index = 0; index < unfillStar.length; index++) {
    
    unfillStar[index].addEventListener('click',function(){
        unfillStar[index].classList.toggle('starfill');
    
    })
}


