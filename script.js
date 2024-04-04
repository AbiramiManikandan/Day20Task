// Fetch data from the given APIs
const fetchData = async () => {
  try {
    const responses = await Promise.all([
      fetch('https://api.publicapis.org/entries'),
      fetch('https://api.publicapis.org/categories'),
      fetch('https://api.publicapis.org/random')
    ]);

    const data = await Promise.all(responses.map(response => response.json()));

    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Display data on the webpage
const displayData = (data) => {
  const apiDataDiv = document.getElementById('apiData');
  
  // Display entries
  const entries = data[0].entries.slice(0, 5);
  const entriesHtml = entries.map(entry => `
    <div class="col-lg-4 col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${entry.API}</h5>
          <p class="card-text">${entry.Description}</p>
          <p class="card-text">Auth: ${entry.Auth}</p>
          <p class="card-text">HTTPS: ${entry.HTTPS ? 'Yes' : 'No'}</p>
          <p class="card-text">Category: ${entry.Category}</p>
        </div>
      </div>
    </div>
  `).join('');
  apiDataDiv.innerHTML += entriesHtml;

  // Display categories
  const categories = data[1].categories.slice(0, 5);
  const categoriesHtml = categories.map(category => `
    <div class="col-lg-4 col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${category}</h5>
        </div>
      </div>
    </div>
  `).join('');
  apiDataDiv.innerHTML += categoriesHtml;

  // Display random API
  const randomApi = data[2];
  const randomApiHtml = `
    <div class="col-lg-4 col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${randomApi.API}</h5>
          <p class="card-text">${randomApi.Description}</p>
          <p class="card-text">Auth: ${randomApi.Auth}</p>
          <p class="card-text">HTTPS: ${randomApi.HTTPS ? 'Yes' : 'No'}</p>
          <p class="card-text">Category: ${randomApi.Category}</p>
        </div>
      </div>
    </div>
  `;
  apiDataDiv.innerHTML += randomApiHtml;
};

// Call the fetchData function when the page loads
window.onload = fetchData;
