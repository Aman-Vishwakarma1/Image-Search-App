const form =  document.querySelector("form");
const inputSearchBar = document.getElementById("image-search-bar");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");

const accessKey = "n7_q4ijTag3cGc-kEsz8dsURNblxffaGgod1RhlqxYc";

let input  = "";
let pageNo = 1;

async function searchImages(params) {
  input = inputSearchBar.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${input}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if(pageNo===1){
    searchResults.innerHTML = "";
  }

  results.map((results)=>{
    const imageWrapper =  document.createElement('div');
    imageWrapper.classList.add("search-result");
    const image = document.createElement('img');
    image.src = results.urls.small;
    image.alt = results.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = results.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = results.alt_description;
  
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  })
  pageNo++;
  if(pageNo>1){
    showMoreBtn.style.display = "block";
  }
};

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  pageNo = 1;
  searchImages();
})

showMoreBtn.addEventListener("click", (e)=>{
  searchImages();
});