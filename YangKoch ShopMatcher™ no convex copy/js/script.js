/*console.log("Script loaded.");

function handleButtonClick(imageUrl) {
  console.log("Button clicked, attempting to scan image...");
  scanProductImage(imageUrl);
}

async function scanProductImage(imageUrl) {
  console.log("scanProductImage called with URL:", imageUrl);
  console.log("Preparing to send image to Cloud Vision API...");
  const apiKey = 'AIzaSyDAc-3qTbLKnNWpFxQfcRhPe53JpMUts4Y'; // Secure your API key properly
  const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const requestPayload = {
      requests: [{
          features: [{type: "WEB_DETECTION"}],
          image: {source: {imageUri: imageUrl}},
      }]
  };

  try {
      console.log("Preparing API call to Cloud Vision.");
      const response = await fetch(visionApiUrl, {
          method: 'POST',
          body: JSON.stringify(requestPayload),
          headers: { 'Content-Type': 'application/json' },
      });

      console.log("API call successful, processing response.");
      const data = await response.json();
      console.log("Response received from Cloud Vision API:", data);
  } catch (error) {
      console.error("Error calling the Cloud Vision API:", error);
  }
}*/

console.log("Script loaded.");

async function handleButtonClick(imageUrl) {
  console.log("Button clicked, attempting to scan image...");
  const visionApiData = await scanProductImage(imageUrl);
  if (visionApiData && visionApiData.responses[0].webDetection && visionApiData.responses[0].webDetection.webEntities) {
    const keywords = visionApiData.responses[0].webDetection.webEntities.map(entity => entity.description).join(" ");
    await searchGoogle(keywords);
  } else {
    console.log("Web entities not found in the vision API response.");
  }
}


async function scanProductImage(imageUrl) {
  console.log("scanProductImage called with URL:", imageUrl);
  console.log("Preparing to send image to Cloud Vision API...");
  const apiKey = 'AIzaSyDAc-3qTbLKnNWpFxQfcRhPe53JpMUts4Y'; // Replace with your actual Cloud Vision API key
  const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const requestPayload = {
      requests: [{
          features: [{type: "WEB_DETECTION"}],
          image: {source: {imageUri: imageUrl}},
      }]
  };

  try {
      console.log("Preparing API call to Cloud Vision.");
      const response = await fetch(visionApiUrl, {
          method: 'POST',
          body: JSON.stringify(requestPayload),
          headers: { 'Content-Type': 'application/json' },
      });

      console.log("API call successful, processing response.");
      const data = await response.json();
      console.log("Response received from Cloud Vision API:", data);
      return data;
  } catch (error) {
      console.error("Error calling the Cloud Vision API:", error);
      return null;
  }
}

/*async function searchGoogle(keywords) {
  console.log("Searching Google for:", keywords);
  const apiKey = 'AIzaSyAZuTPtiYGtONhtzeqFUBr4K6yBhfvXpnU'; // Replace with your actual Custom Search API key
  const searchEngineId = 'b3635c01dfe504cbb'; // Replace with your actual Custom Search Engine ID
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(keywords)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Google Search results:", data);
    // Process and display the search results in your dashboard
  } catch (error) {
    console.error("Error performing Google Search:", error);
  }
}*/

async function displayResultsByPlatform(data) {
  // Define platform IDs and their corresponding image container elements
  const platformDivs = {
    tiktok: document.querySelector('#tiktok .image-container'),
    amazon: document.querySelector('#amazon .image-container'),
    etsy: document.querySelector('#etsy .image-container'),
    temu: document.querySelector('#temu .image-container'),
    aliexpress: document.querySelector('#aliexpress .image-container'),
    pinterest: document.querySelector('#pinterest .image-container'),
    facebook: document.querySelector('#facebook .image-container'),
    instagram: document.querySelector('#instagram .image-container'),
    shein: document.querySelector('#shein .image-container'),
    alibaba: document.querySelector('#alibaba .image-container'),
    other: document.querySelector('#other .image-container'),
  };

  // Clear existing content in image containers
  Object.values(platformDivs).forEach(div => {
    if(div) div.innerHTML = '';
  });

  // Categorize and append new items
  data.items.forEach(item => {
    const imgSrc = item.pagemap?.cse_image[0]?.src;
    if (!imgSrc) return; // Skip if no image source is found

    // Determine the platform based on the item's link
    const platformKey = Object.keys(platformDivs).find(platform => item.link.includes(platform)) || 'other';
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.className = 'content-item'; // Ensure you have CSS for this class

    // Append the image element to the corresponding platform's image container
    if(platformDivs[platformKey]) platformDivs[platformKey].appendChild(imgElement);
  });
}


// Update your searchGoogle function to call displayResultsByPlatform
async function searchGoogle(keywords) {
  console.log("Searching Google for:", keywords);
  const apiKey = 'AIzaSyAZuTPtiYGtONhtzeqFUBr4K6yBhfvXpnU'; // Replace with your actual Custom Search API key
  const searchEngineId = 'b3635c01dfe504cbb'; // Replace with your actual Custom Search Engine ID
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(keywords)}`;
  // Your existing searchGoogle code here
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Google Search results:", data);
     // Save results to local storage right after fetching and processing
  localStorage.setItem('searchResults', JSON.stringify(data));
    displayResultsByPlatform(data); // Display results categorized by platform
  } catch (error) {
    console.error("Error performing Google Search:", error);
  }
}
/*
document.addEventListener('DOMContentLoaded', () => {
  const storedResults = localStorage.getItem('searchResults');
  if (storedResults) {
    const data = JSON.parse(storedResults);
    displayResultsByPlatform(data); // Make sure data is in the expected format
  }
});
*/
document.addEventListener('DOMContentLoaded', () => {
  const bulkSaveButtons = document.querySelectorAll('.bulkSave');
  bulkSaveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Implement your bulk save functionality here
      console.log("Bulk save for platform:", e.target.parentNode.id);
    });
  });
});

// Example for individual download feature
document.addEventListener('DOMContentLoaded', () => {
  // Assuming you already have images appended to the platform divs with class 'content-item'
  const images = document.querySelectorAll('.content-item');
  images.forEach(image => {
    const downloadIcon = document.createElement('a');
    downloadIcon.href = image.src;
    downloadIcon.download = 'Download.jpg'; // or dynamically generate a filename
    downloadIcon.innerHTML = '<img src="..images/single-download.png" class="download-icon" />'; // Add your download icon image path
    downloadIcon.style.position = 'absolute';
    downloadIcon.style.right = '10px';
    downloadIcon.style.bottom = '10px';
    image.parentElement.appendChild(downloadIcon);
  });
});

// Simplified outline for bulk download functionality
async function bulkDownload(platformId) {
  const jsZip = new jsZip();
  const images = document.querySelector(`#${platformId} .image-container`).querySelectorAll('img');

  for (let image of images) {
    const imgData = await fetch(image.src).then(res => res.blob());
    jsZip.file(`image-${Date.now()}.jpg`, imgData, { binary: true });
  }

  jsZip.generateAsync({type:"blob"})
    .then(function(content) {
      saveAs(content, "images.zip");
    });
}



