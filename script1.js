const asyncAwaitButton = document.querySelector("#async-await-button");
const promiseButton = document.querySelector("#promise-button");
const results = document.querySelector(".results");

let arr = [];
let artistsData = [];
const sticker = (element) => {
  const div = document.createElement("div");
  div.className = "artist";
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  img.src = element.image;
  h1.innerText = element.name;
  div.append(img, h1);
  results.appendChild(div);
};

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
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

  if (results.hasChildNodes()) {
    removeChilds(results);
  } else {
    arr.forEach((element) => sticker(element));
  }
});

asyncAwaitButton.addEventListener("click", () => {

  const fetchData = async () => {
  const results = await fetch("./api/artists.json")
  return results.json();
}
  try{
     fetchData().then(e => artistsData.push(e));
     console.log("artist => ", artistsData)
    //artistsData.forEach((artist) => console.log("artist => ", artist.name));
  }
  catch(e){
    console.error(e)
  }
});
