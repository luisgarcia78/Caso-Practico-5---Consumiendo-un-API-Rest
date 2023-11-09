function detectLanguage() {
    const apiKey = '04c736bca84bed0939efb3b6edb5b61a'; // Reemplaza con tu propia clave de API
    const text = document.getElementById('text').value;

    if (!text) {
        alert('Please enter some text.');
        return;
    }

    fetch(` https://ws.detectlanguage.com/0.2/detect?q=${encodeURIComponent(text)}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');

            // Limpiar resultados anteriores
            resultDiv.innerHTML = '';

            if (data && data.data && data.data.detections && data.data.detections.length > 0) {
                // Mostrar datos en la página
                const detectedLanguage = data.data.detections[0].language;
                resultDiv.innerHTML = `<p><strong>Detected Language:</strong> ${detectedLanguage}</p>`;
            } else {
                // Mostrar un mensaje si no se detecta ningún idioma
                resultDiv.textContent = 'Language detection failed.';
            }
        })
        .catch(error => {
            console.error('Error detecting language:', error.message);
            document.getElementById('result').innerHTML = 'Error detecting language. Please try again.';
        });
}