import { consultaJogos, filtrar } from "./getJogos.js";
let qntd = 10;
let qntdExibido = 0;

let games = await consultaJogos();
export async function exibe(filtro = "sort-by=popularity") {
  const container = document.getElementById("conteudo-main");
  const banner = document.getElementById("banner");

  if (typeof filtro == "object") {
    filtro.forEach(async function (ids) {
      let arrayFavs = new Array();
      filtrar(`game?id=${ids.id}`);
      let item = await consultaJogos();
      arrayFavs.push(item);
      console.log(arrayFavs);
    });
  } else {
    console.log(games);
  }

  for (qntdExibido; qntdExibido < qntd + 1; qntdExibido++) {
    if (qntdExibido == 0) {
      banner.insertAdjacentHTML(
        "afterbegin",
        `
            <div class="image" id="${games[qntdExibido].id}">
                  <img src="${games[qntdExibido].thumbnail}" alt="" />
                  <div class="details">
                    <h2>${games[qntdExibido].title}</h2>
                    <div class="more">
                    <div class="short-disc">
                      <a href="${games[qntdExibido].freetogame_profile_url}" target="_blank" class="read-more"><p class="short">${games[qntdExibido].short_description}</p></a>
                      </div>
                      <div class="icons">
                        <span class="star"><i class="bi bi-star-fill"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
            `
      );
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="image" id="${games[qntdExibido].id}">
                  <img src="${games[qntdExibido].thumbnail}" alt="" />
                  <div class="details">
                    <h2>${games[qntdExibido].title}</h2>
                    <div class="more">
                    <div class="short-disc">
                      <a href="${games[qntdExibido].freetogame_profile_url}" target="_blank" class="read-more"><p class="short">${games[qntdExibido].short_description}</p></a>
                      </div>
                      <div class="icons">
                        <span class="star"><i class="bi bi-star-fill"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
            `
      );
    }

    if (qntdExibido == games.length) {
      break;
    }
  }
}

export function load() {
  qntd += 10;
  exibe();
}
