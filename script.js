let arr = [];
fetch("./api/artists.json")
  .then((response) => response.json())
  .then((res) => {
    res.forEach((element) => {
      arr.push({ name: element.name, image: element.image });
    });
  })
  .catch((err) => console.log(err));

const promiseButton = document.querySelector("#promise-button");

const sticker = (element) => {
  const div = document.createElement("div");
  div.className = "artist";
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  img.src = element.image;
  h1.innerText = element.name;
  div.append(img, h1);
  const results = document.querySelector(".results");
  results.appendChild(div);
};

promiseButton.addEventListener("click", () => {
  arr.forEach((element) => sticker(element));
});
