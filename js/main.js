const teste = document.getElementById("cod");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6491e5bb7fmshf3fa2279323d6a7p1674e8jsndbbb08cdac8c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
function exibe(r){
    console.log(r[0]);
    console.log(r.length);
    console.log(window.localStorage.getItem("516"));
    for(var x = 0; x < r.length; x++){
        let div = document.createElement("div")
        let titulo = document.createElement("h1");
        let img = document.createElement("img");
        let desc = document.createElement("p");
        img.src = r[x].thumbnail;
        titulo.innerText = r[x].title   
        desc.innerText = r[x].short_description
        div.appendChild(img)
        div.appendChild(titulo);
        div.appendChild(desc)
        teste.appendChild(div)
    }
}
fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter', options)
	.then(response => response.json())
	.then(response => exibe(response))
	.catch(err => console.error(err));