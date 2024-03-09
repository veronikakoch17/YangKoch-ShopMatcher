// Listen for clicks on the "Analyze Image" button
document.getElementById('analyzeButton').addEventListener('click', function() {
  const imageInput = document.getElementById('imageInput');
  if (imageInput.files.length > 0) {
      console.log("Image selected for analysis:", imageInput.files[0].name);
      
      // TODO: Replace this with a function to send the image to the Cloud Vision API via the backend
      // For now, let's simulate fetching data after image analysis
      setTimeout(fetchMockData, 1000); // Mock data fetching for demonstration
  }
});

// Simulate receiving data from the backend after image analysis
function fetchMockData() {
  console.log("Fetching data from backend...");

  // Simulate dynamic content update as if received from the backend
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = ''; // Clear previous results before displaying new ones

  // Example: Create a mock piece of content based on presumed backend response
  const contentElement = document.createElement('div');
  contentElement.className = 'platform';
  contentElement.innerHTML = `
      <h3>Product Title</h3>
      <p>Description of the product...</p>
      <img src="path/to/product/image.jpg" alt="Product" style="width: 100%;">
      <button class="saveContent">Save</button>
  `;
  resultsContainer.appendChild(contentElement);

  // Call setupSaveButtons after content is dynamically added to ensure event listeners are attached
  setupSaveButtons();
}

// Setup event listeners for dynamically added "Save" buttons
function setupSaveButtons() {
  document.querySelectorAll('.saveContent').forEach(button => {
      button.addEventListener('click', function(event) {
          const contentToSave = event.target.closest('.platform');
          console.log("Saving content:", contentToSave.querySelector('h3').textContent);
          // TODO: Implement actual functionality to save content, likely involving a backend call
      });
  });
}

// Event listener for sorting by platform button
document.getElementById('sortByPlatform').addEventListener('click', function() {
  console.log("Sorting by platform...");
  // TODO: Implement actual sorting logic, possibly requiring backend support or client-side sorting
});

// Event listener for sorting by content type button
document.getElementById('sortByType').addEventListener('click', function() {
  console.log("Sorting by content type...");
  // TODO: Implement actual sorting logic, which may involve adjusting the query sent to the backend or sorting client-side
});

// Note for further development:
// As the extension's functionality expands, consider implementing actual backend calls to Convex for data fetching.
// Enhance the user experience by handling sorting and filtering based on user selection.
// Expand the functionality for saving content, potentially using user accounts or local storage for personalized experiences.

