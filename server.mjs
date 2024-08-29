// Import required modules
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Create an instance of Express
const app = express();
const port = 3000;

// Enable CORS for all routes to allow cross-origin requests
app.use(cors());

// Define a route for the proxy server
app.get('/proxy', async (req, res) => {

    // URL of the site to fetch data from
    const url = 'https://skippi.in/';

    try {
        // Fetch the HTML content from the target URL
        const response = await fetch(url);
        
        // Convert the response to text (HTML content)
        const data = await response.text();
        
        // Send the HTML content back to the client
        res.send(data);
        
    } catch (error) {
        // Send an error response if the fetch fails
        res.status(500).send('Error fetching data');
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
