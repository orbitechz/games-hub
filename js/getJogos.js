

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6491e5bb7fmshf3fa2279323d6a7p1674e8jsndbbb08cdac8c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?platform=all', options).then(response => response.json());

export function jogos() {
	return res;
}

