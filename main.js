const button = document.querySelector("#button");
let input = document.querySelector(".input");
let loader = document.createElement("div");
loader.innerHTML = "Loading...";
loader.style.position = "absolute";
loader.style.top = "50%";
loader.style.left = "50%";
loader.style.transform = "translate(-50%, -50%)";
loader.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
loader.style.color = "white";
loader.style.padding = "20px";
loader.style.borderRadius = "20px";
loader.style.display = "none";
document.body.appendChild(loader);

input.focus();
button.addEventListener("click", turn);
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13 || event.key === "Enter") {
    turn();
  }
});

async function fetchImages() {
  const API_KEY = "42957278-5812423f968cffad41d7d0b12";
  let endpoint = "https://pixabay.com/api/";
  let query = input.value;
  let count = 4;

  let url = `${endpoint}?key=${API_KEY}&q=${query}&per_page=${count}`;

  try {
    document.querySelector("#sorry").style.display = "none";
    loader.style.display = "block";
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data);
    loader.style.display = "none";
    return data.hits.map((photo) => photo.webformatURL);
  } catch (error) {
    console.error("Error fetching images:", error);
    loader.style.display = "none";
    return [];
  }
}
let container = document.getElementById("image-container");

async function displayImages() {
  let imageUrls = await fetchImages();
  imageUrls.forEach((url) => {
    let div = document.createElement("div");
    div.className = "img";
    let img = document.createElement("img");
    let image = document.querySelector(".img");
    img.src = url;
    div.appendChild(img);
    container.appendChild(div);

    // Add click event to open slider
    img.addEventListener("click", () => {
      currentIndex = imageUrls.indexOf(url); // Set current index to clicked image
      createSlider(imageUrls); // Create and show slider
    });
  });

  if (imageUrls.length === 0) {
    document.querySelector("#sorry").style.display = "block";
  }
}

function turn() {
  if (input.value == "") {
    return alert("please check prompt");
  }
  container.innerHTML = "";
  displayImages();
  input.value = "";

  document.body.style.overflow = "hidden";
}

let currentIndex = 0; // To track the current image index
let slider; // Slider element

function createSlider(imageUrls) {
  // Create slider container
  slider = document.createElement("div");
  slider.className = "slider"; // Apply CSS class

  const img = document.createElement("img");
  slider.appendChild(img);

  const prevButton = document.createElement("button");
  prevButton.innerText = "<";
  const nextButton = document.createElement("button");
  nextButton.innerText = ">";

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "x"; // Close button text
  closeButton.style.position = "absolute"; // Position it at the top
  closeButton.style.top = "10px"; // Adjust as needed
  closeButton.style.right = "10px"; // Adjust as needed
  closeButton.style.padding = "0px"; // Adjust as needed
  closeButton.style.height = "0px"; // Adjust as needed

  slider.appendChild(closeButton); // Add close button to slider
  slider.appendChild(prevButton);
  slider.appendChild(img);
  slider.appendChild(nextButton);
  document.body.appendChild(slider);

  // Close button event listener
  closeButton.addEventListener("click", () => {
    document.body.removeChild(slider); // Remove slider from DOM
  });

  // Function to update the image
  function updateImage() {
    img.src = imageUrls[currentIndex];
  }

  // Event listeners for buttons
  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : imageUrls.length - 1;
    updateImage();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < imageUrls.length - 1 ? currentIndex + 1 : 0;
    updateImage();
  });

  updateImage(); // Set initial image
}
