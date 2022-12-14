let filtro = "games?sort-by=popularity"; // Filtro dinamioco usado para filtrar o sjogos

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6491e5bb7fmshf3fa2279323d6a7p1674e8jsndbbb08cdac8c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
export async function consultaJogos(){ // Funcao que retorna os jogos pesquisados usando o filtro
	return await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/${filtro}`, options).then(response => response.json());
	
}

export function filtrar(f="games?sort-by=popularity"){ // Funcao que altera somente o filtro
	filtro = f;
}
