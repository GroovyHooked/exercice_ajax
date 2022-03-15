const asyncAwaitButton = document.querySelector("#async-await-button");
const promiseButton = document.querySelector("#promise-button");
const results1 = document.querySelector(".results1");
const results2 = document.querySelector(".results2");
let arr = [];
let artistsData = [];

const sticker = (element, result) => {
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

const fetchData = async () => {
  const results = await fetch("./api/artists.json");
  results.json().then((e) => artistsData.push(e));
  return artistsData[0].forEach((element) => sticker(element, results2));
};

promiseButton.addEventListener("click", () => {
  fetch("./api/artists.json")
    .then((response) => response.json())
    .then((res) => {
      res.forEach((element) => {
        arr.push({ name: element.name, image: element.image });
      });
    })
    .catch((err) => console.log(err));

  if (results1.hasChildNodes()) {
    removeChilds(results1);
  } else {
    arr.forEach((element) => sticker(element, results1));
  }
});

asyncAwaitButton.addEventListener("click", () => {
  if (results2.hasChildNodes()) {
    removeChilds(results2);
  } else {
    try {
      fetchData();
    } catch (e) {
      console.error(e);
    }
  }
});
