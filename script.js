const asyncAwaitButton = document.querySelector("#async-await-button");
const promiseButton = document.querySelector("#promise-button");
const results1 = document.querySelector(".results1");
const results2 = document.querySelector(".results2");
const openClose1 = document.querySelector(".first");
const openClose2 = document.querySelector(".second");

let arr = [];
let artistsData = [];

const stickerMaker = (element, result) => {
  const div = document.createElement("div");
  div.className = "artist";
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  img.src = element.image;
  h1.innerText = element.name;
  div.append(img, h1);
  result.appendChild(div);
};

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const storeInArray = (value) => {
  value.forEach((element) => {
    arr.push({ name: element.name, image: element.image });
  });
};

const fetchArtist = () => {
  fetch("./api/artists.json")
    .then((response) => response.json())
    .then((res) => storeInArray(res))
    .catch((err) => console.log(err));
  
  if (results1.hasChildNodes()) {
    openClose1.innerHTML = "Closed";
    removeChilds(results1);
  } else {
    openClose1.innerHTML = "Open";
    arr.forEach((element) => stickerMaker(element, results1));
  }
}

const asyncAwaitCall = async () => {
  const results = await fetch("./api/artists.json");
  results.json().then((e) => artistsData.push(e));
  return artistsData[0].forEach((element) => stickerMaker(element, results2));
};

const asyncArtist = () => {
  //debugger
  if (results2.hasChildNodes()) {
    openClose2.innerHTML = "Closed";
    removeChilds(results2);
  } else {
    openClose2.innerHTML = "Open";
    try {
      asyncAwaitCall();
    } catch (e) {
      console.error(e);
    }
  }
}

promiseButton.addEventListener("click", fetchArtist);
asyncAwaitButton.addEventListener("click", asyncArtist);
