

const button = document.querySelector("#button")
let input = document.querySelector(".input")

input.focus()
button.addEventListener("click",turn);
input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13 || event.key === "Enter") {
      turn();
    }
  });

async function fetchImages() {

   const API_KEY = "42957278-5812423f968cffad41d7d0b12";
   let endpoint = 'https://pixabay.com/api/';
   let query = input.value; 
   let count = 4; 

    let url = `${endpoint}?key=${API_KEY}&q=${query}&per_page=${count}`;

    try {
       let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
       let data = await response.json();
        console.log(data)
        return data.hits.map(photo => photo.webformatURL);
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}
let container = document.getElementById('image-container');    

async function displayImages() {
    
  
   let imageUrls = await fetchImages();
    imageUrls.forEach(url => {
        let div = document.createElement("div")
        div.className = "img";
       let img = document.createElement('img');
        let image = document.querySelector(".img")
        img.src = url;
        div.appendChild(img);
        container.appendChild(div)
    });

    
}


function turn (){
    if (input.value ==""){
        alert("please check prompt")
    }
    container.innerHTML =""
    displayImages()
    input.value=""

}