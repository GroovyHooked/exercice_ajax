const asuncAwaitButton = document.querySelector("#async-await-button");
const results = document.querySelector(".results");

let arr;
const fetchData = async () => {
    let response = await fetch("./api/artists.json")
    arr = await response.json()
    return arr
}
artistsData = fetchData()