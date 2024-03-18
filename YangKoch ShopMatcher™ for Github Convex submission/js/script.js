console.log("Script loaded.");

async function handleButtonClick(imageUrl) {
  console.log("Button clicked, attempting to scan image...");
  const visionApiData = await scanProductImage(imageUrl);
  if (visionApiData && visionApiData.responses[0].webDetection && visionApiData.responses[0].webDetection.webEntities) {
    const keywords = visionApiData.responses[0].webDetection.webEntities.map(entity => entity.description).join(" ");
    await searchGoogle(keywords);
  } else {
    console.log("Web entities not found in the vision API response.");
    // Add default message or action here
  }
}


async function scanProductImage(imageUrl) {
  console.log("scanProductImage called with URL:", imageUrl);
  console.log("Preparing to send image to Cloud Vision API...");
  // Replace with your mock Cloud Vision API key or remove this section if using mock data
  const apiKey = 'YOUR-API-KEY'; // Replace with your actual Cloud Vision API key
  const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const requestPayload = {
      requests: [{
          features: [{type: "WEB_DETECTION"}],
          image: {source: {imageUri: imageUrl}},
      }]
  };

  try {
      console.log("Preparing API call to Cloud Vision.");
      // Mock API call using fetch with mock data or replace it with actual API call
      const data = await mockCloudVisionAPI(requestPayload);
      console.log("Response received from Cloud Vision API:", data);
      return data;
  } catch (error) {
      console.error("Error calling the Cloud Vision API:", error);
      return null;
  }
}

async function mockCloudVisionAPI(requestPayload) {
  // Mock API call using fetch or replace it with actual API call
  // Example of mock data
  return {
    responses: [
      {
        webDetection: {
          webEntities: [
            { description: "bamboo_towel" },
            { description: "shower_cloth" },
            // Add more mock keywords as needed
          ]
        }
      }
    ]
  };
}

// Mock searchGoogle function using fetch or replace it with actual API call
async function searchGoogle(keywords) {
  console.log("Searching Google for:", keywords);
  try {
    // Mock API call using fetch with mock data or replace it with actual API call
    const data = await mockGoogleSearch(keywords);
    console.log("Google Search results:", data);
    // Process and display the search results in your dashboard
    // Display mock search results by calling displayResultsByPlatform
    displayResultsByPlatform(data);
  } catch (error) {
    console.error("Error performing Google Search:", error);
  }
}


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
    const imgSrc = item.pagemap?.cse_image?.[0]?.src;
    const link = item.link;
    const price = item.price; // Extract the price from the item

    if (!imgSrc || !link || !price) return; // Skip if no image source, link, or price is found

    // Determine the platform based on the item's link
    const platformKey = Object.keys(platformDivs).find(platform => link.includes(platform)) || 'other';
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.className = 'content-item'; // Ensure you have CSS for this class

    // Create a paragraph element for displaying the price
    const priceElement = document.createElement('p');
    priceElement.textContent = price;

    // Create a container div to hold the image and price
    const containerDiv = document.createElement('div');
    containerDiv.appendChild(imgElement);
    containerDiv.appendChild(priceElement);

    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.appendChild(imgElement);
    containerDiv.appendChild(linkElement);
    containerDiv.appendChild(priceElement);


    // Append the container div to the corresponding platform's image container
    if(platformDivs[platformKey]) platformDivs[platformKey].appendChild(containerDiv);
  });
}



async function searchGoogle(keywords) {
  console.log("Searching Google for:", keywords);
  try {
    // Instead of making an actual API call, return mock data directly
    const data = await mockGoogleSearch(keywords);
    console.log("Google Search results:", data);
    // Process and display the search results in your dashboard
    // Display mock search results by calling displayResultsByPlatform
    displayResultsByPlatform(data);
    sessionStorage.setItem('storedImageData', JSON.stringify(data));
  } catch (error) {
    console.error("Error performing Google Search:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if there is stored image data in sessionStorage
  const storedImageData = sessionStorage.getItem('storedImageData');
  if (storedImageData) {
    const data = JSON.parse(storedImageData);
    displayResultsByPlatform(data); // Make sure data is in the expected format
  } else {
    // Proceed with the regular initialization process
    // For example, trigger the image scan when the page loads
    const imageUrl = '...'; // Replace with the actual image URL
    handleButtonClick(imageUrl);
  }
});

// Mock function to return fake data for demonstration purposes
async function mockGoogleSearch(keywords) {
  // Example of mock data
  return {
    items: [
      {
        link: "https://www.amazon.com/JMEYIWQ-Kitchen-Honeycomb-Absorbent-Cleaning/dp/B0CFJY8938",
        title: "Example Amazon Product",
        price: "$19.99", // Add price information here
        pagemap: { cse_image: [{ src: "https://m.media-amazon.com/images/I/71Vaici88NL._AC_SX679_.jpg" }] }
      },
      {
        link: "https://us.shein.com/Waffle-Weave-Kitchen-Towels-p-28667697.html?src_identifier=st%3D2%60sc%3Dwaffle%20towel%60sr%3D0%60ps%3D1&src_module=search&mallCode=1&pageListType=4&imgRatio=1-1",
        title: "Example Shein Product",
        price: "$9.99", // Add price information here
        pagemap: { cse_image: [{ src: "//img.ltwebstatic.com/images3_spmp/2024/01/25/59/1706159866ded9e6440796e5f5d0d11254df354104_square_thumbnail_900x.jpg" }] }
      },
      // Add more mock search results as needed
    ]
  };
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
  const jsZip = new JSZip();
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

document.addEventListener('DOMContentLoaded', () => {
  const bulkSaveButtons = document.querySelectorAll('.bulkSave');
  bulkSaveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      bulkDownload(e.target.parentNode.id); // Assumes the button's parent node has an ID corresponding to the platform
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Check if the URL contains a parameter indicating a product page visit
  const urlParams = new URLSearchParams(window.location.search);
  const productVisited = urlParams.has('productVisited');
  console.log('Product visited:', productVisited);

  // Check if the login popup has been shown before
  const popupShown = sessionStorage.getItem('popupShown');
  console.log('Popup shown:', popupShown);

  // Check if the popup should be displayed
  const shouldDisplayPopup = !popupShown && productVisited;
  console.log('Should display popup:', shouldDisplayPopup);

  if (shouldDisplayPopup) {
    const loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
      loginPopup.style.display = "block";
      // Set sessionStorage to indicate that the popup has been shown
      sessionStorage.setItem('popupShown', 'true');
      
      // Get the close button within the popup
      const closeButton = loginPopup.querySelector('.close-button');
      if (closeButton) {
        // Add click event listener to close the popup when the close button is clicked
        closeButton.addEventListener('click', () => {
          loginPopup.style.display = "none";
        });
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const loginPopup = document.getElementById('loginPopup');
  const closeButton = document.querySelector('.close-button');

  if (closeButton && loginPopup) {
    closeButton.addEventListener('click', () => {
      loginPopup.style.display = "none";
    });

    window.addEventListener('click', (event) => {
      if (!loginPopup.contains(event.target)) {
        loginPopup.style.display = "none";
      }
    });
  }
});






// Remove the import statement and directly use convex.ConvexClient or ConvexHttpClient if it's globally available




// Example Convex function call - adjust according to your project setup
function logLoginAttempt(email) {
  // This is a placeholder function. You'll need to replace this with your actual Convex function call.
  console.log("Logging in with email:", email);
  // Replace the above console.log with your Convex logging function call.
  // e.g., convex.("logLoginAttempt", {email, success: true}).then(...);
}

// Assuming convex has been correctly initialized earlier in your script
// For example: const convex = new ConvexHttpClient("https://your-deployment.convex.dev");

document.getElementById('loginBtn').addEventListener('click', async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
      try {
          console.log('Attempting to call Convex mutation: logLoginAttempt');
          // Here you call your Convex mutation to log the login attempt
          const result = await convex.mutate("logLoginAttempt", { email, success: true });
          console.log('Login attempt logged successfully:', result);
          alert('Login successful!'); // This shows a success message
      } catch (error) {
          console.error('Error logging login attempt:', error);
          alert(`Error during login: ${error.message || error}`);
      }
  } else {
      alert('Please enter both email and password.'); // This handles empty inputs
  }
});
