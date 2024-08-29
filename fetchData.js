// Function to extract text content from HTML
function extractTextContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

// Function to display the extracted data on the webpage
function displayData(text) {
    const contentDiv = document.getElementById('content');
    const cleanedText = text; // Consider implementing text cleaning here
    contentDiv.innerHTML = `
        <h2>Data from the proxy server</h2>
        <p>${cleanedText}</p>
    `;
}

// Function to fetch data from the proxy server
async function fetchData() {
    try {
        const response = await fetch(proxyUrl, {
            method: 'GET', 
            headers: {
                'Content-Type': 'text/html'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const textContent = extractTextContent(html);
        displayData(textContent);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function to initiate the data fetching process
fetchData();
