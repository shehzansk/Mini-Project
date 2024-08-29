const proxyUrl = 'http://localhost:3000/proxy';

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

function extractTextContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function displayData(text) {
    const contentDiv = document.getElementById('content');
    let trashData = escapeHtml(text)
    const cleanedText = trashData.replace(/[^a-zA-Z\s.,!?']/g, ' ');
    contentDiv.innerHTML = `
        <h2>Data from the proxy server</h2>
        <p>${cleanedText}</p>
    `;
}

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}

fetchData();

