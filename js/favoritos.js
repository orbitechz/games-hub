let unfillStar = document.querySelectorAll(".star");
let favs = document.querySelector('.fav');


let homeContent = document.querySelector('.main-content');


unfillStar.forEach(function(star){
    star.addEventListener('click',function(){
        star.classList.toggle('starfill');
    
    })
}
)
    


