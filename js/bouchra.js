const teste = document.getElementById("cod");
let homeContent = document.querySelector('.container')
let loadMoreBtn = document.querySelector('.container button')

let initialItems = 10 ;
let loadItems = 10 ;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6491e5bb7fmshf3fa2279323d6a7p1674e8jsndbbb08cdac8c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};


fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?platform=all', options)
	.then(response => response.json())
    .then(response => {localStorage.setItem('games',JSON.stringify(response));
});


	
function loadInitialItems(){
    let games = JSON.parse(localStorage.getItem('games'));
    let out = "";
    let counter = 0 ;
    for(let game of games){
        if(counter < initialItems){
            out += `
            <div class="image">
              <img src="${game.thumbnail}" alt="" />
              <div class="details">
                <h2>${game.title}</h2>
                <div class="more">
                  <a href="#" class="read-more">Access <span>Game</span></a>
                  <div class="icons">
                    <span class="star"><i class="bi bi-star-fill"></i></span>
                  </div>
                </div>
              </div>
            </div>
            `;
        }
        counter++;
    }
    let div = document.createElement("div");
    div.className ='row'
    homeContent.insertBefore(div,loadMoreBtn);
    div.innerHTML = out ;
}


function loadData(){
let games = JSON.parse(localStorage.getItem('games'));
let caurrentDisplayGames = document.querySelectorAll(".image").length;
let out = '';
let counter = 0 ;
for(let game of games){
    if(counter >= caurrentDisplayGames && counter < loadItems + caurrentDisplayGames){
out += `
<div class="image">
              <img src="${game.thumbnail}" alt="" />
              <div class="details">
                <h2>${game.title}</h2>
                <div class="more">
                  <a href="#" class="read-more">Access <span>Game</span></a>
                  <div class="icons">
                    <span class="star"><i class="bi bi-star-fill"></i></span>
                  </div>
                </div>
              </div>
            </div>
`;
    }
    counter++;
}
let div = document.createElement("div");
    div.className ='row'
    homeContent.insertBefore(div,loadMoreBtn);
    div.innerHTML = out ;
    div.style.opacity = 0 ;

    if(document.querySelectorAll(".image").length == games.length){
loadMoreBtn.style.display = 'none';
    }
    fadeIn(div);
}

function fadeIn(div){
    let opacity = 0;
    let interval = setInterval(function(){
if(opacity <=1){
    opacity = opacity + 0.1;
    div.style.opacity = opacity;
}else{
    clearInterval(interval);
}
    },30)
}