const asyncAwaitButton = document.querySelector("#async-await-button");
const promiseButton = document.querySelector("#promise-button");
const results1 = document.querySelector(".results1");
const results2 = document.querySelector(".results2");
const openClose1 = document.querySelector(".first");
const openClose2 = document.querySelector(".second");

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const stickerMaker = ({ ...data }, resultDisplay) => {
  const div = document.createElement("div");
  div.className = "artist";
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  img.src = data.image;
  h1.innerText = data.name;
  div.append(img, h1);
  resultDisplay.appendChild(div);
};

const functionFetch = () => {
  fetch("./api/artists.json")
    .then((response) => response.json())
    .then((res) =>
      res.forEach((artist) =>
        stickerMaker({ name: artist.name, image: artist.image }, results1)
      )
    )
    .catch((err) => console.error(err));
};

const fetchArtist = () => {
  if (results1.hasChildNodes()) {
    openClose1.innerText = "Closed";
    removeChilds(results1);
  } else {
    openClose1.innerText = "Open";
    functionFetch();
  }
};

const asyncAwaitCall = async () => {
  const results = await fetch("./api/artists.json");
  await results.json().then((e) =>
    e.forEach((element) => {
      stickerMaker({ name: element.name, image: element.image }, results2);
    })
  );
};

const asyncArtist = () => {
  if (results2.hasChildNodes()) {
    openClose2.innerText = "Closed";
    removeChilds(results2);
  } else {
    openClose2.innerText = "Open";
    try {
      asyncAwaitCall();
    } catch (e) {
      console.error(e);
    }
  }
};

promiseButton.addEventListener("click", fetchArtist);
asyncAwaitButton.addEventListener("click", asyncArtist);
