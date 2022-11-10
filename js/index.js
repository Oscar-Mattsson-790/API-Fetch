"use strict";

// const API_KEY = "eVHt9I3sBh2TausqEBuez_--YL_OF3jj56eCK_OLqLc";
// const BASE_URL = "https://api.unsplash.com";
// const imagesElem = document.querySelector("#images");

// function createImageElem(image) {
//   const imageElem = document.createElement("img"); // Skapar en img - tagg
//   imageElem.setAttribute("src", image.urls.thumb);
//   imagesElem.append(imageElem);
// }

// function displayImages(images) {
//   for (const image of images) {
//     createImageElem(image);
//   }
// }

// async function getPhotos() {
//   const response = await fetch(
//     `${BASE_URL}/search/photos?client_id=${API_KEY}&query=ca&per_page=50`
//   );
//   const data = await response.json();
//   console.log(data);

//   displayImages(data.results);
// }
// getPhotos();

// FLICKR :API

// const SECRET_KEY = '055dcf90a77d05b2'
// JSON: https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=abc12378asdashdjsah8sds&text=banana=per_page=20&sort=date-taken-asc&format=json

function createImg(url, title) {
  const photosWrapper = document.querySelector("#photos");

  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", url);
  imgElement.setAttribute("title", title);

  photosWrapper.append(imgElement);
}

function renderImages(dataFromApi) {
  console.log("Bara bilderna: ", dataFromApi.photos.photo);

  const photosWrapper = document.querySelector("#photos");
  photosWrapper.innerHTML = "";
  const allPhotos = dataFromApi.photos.photo;

  for (let singlePhoto of allPhotos) {
    console.log(singlePhoto.title);
    if (singlePhoto.farm !== 0) {
      const imgUrl = `https://farm${singlePhoto.farm}.staticflickr.com/${singlePhoto.server}/${singlePhoto.id}_${singlePhoto.secret}_q.jpg`;
      console.log("Bild-URL: ", imgUrl);
      const title = singlePhoto.title;

      createImg(imgUrl, title);
    }
  }
}

async function getImages(search) {
  const apiKey = "api_key=4eb8afbe68e13815446305ce1379f86e";
  const baseUrl = "https://api.flickr.com/services/rest?";
  const method = "&method=flickr.photos.search";
  const misc = "&format=json&nojsoncallback=1";
  const url = baseUrl + apiKey + method + "&text=" + search + misc;

  console.log("API-url: ", url);

  const response = await fetch(url);

  const data = await response.json();

  console.log("Data från Flickr: ", data);

  renderImages(data);
}

document.querySelector("#search").addEventListener("click", function () {
  const search = document.querySelector("#search-string").value;
  getImages(search);
});
