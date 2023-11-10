function detectLanguage() {
    const apiKey = '04c736bca84bed0939efb3b6edb5b61a'; // Reemplaza con tu propia clave de API
    const text = document.getElementById('text').value;

    if (!text) {
        alert('Please enter some text.');
        return;
    }

    // Objeto que mapea siglas de idiomas a nombres completos
    const languageMappings = {
        'en': 'Inglés',
        'es': 'Español',
        'fr': 'Francés',
        'de': 'Alemán',
        'it': 'Italiano',
        'pt': 'Portugués',
        'ru': 'Ruso',
        'zh': 'Chino',
        'ja': 'Japonés',
        'ar': 'Árabe',
        'hi': 'Hindi',
        'ko': 'Coreano',
        'tr': 'Turco',
        'nl': 'Neerlandés',
        'sv': 'Sueco',
        'fi': 'Finlandés',
        'no': 'Noruego',
        'da': 'Danés',
        'pl': 'Polaco',
        'hu': 'Húngaro',
        'ro': 'Rumano',
        'cs': 'Checo',
        'sk': 'Eslovaco',
        'bg': 'Búlgaro',
        'el': 'Griego',
        'th': 'Tailandés',
        'id': 'Indonesio',
        'ms': 'Malayo',
        'vi': 'Vietnamita',
        'he': 'Hebreo',
        'fa': 'Persa',
        'ur': 'Urdu',
        'bn': 'Bengalí',
        'ta': 'Tamil',
        'te': 'Telugu',
        'mr': 'Marathi',
        'gu': 'Gujarati',
        'kn': 'Kannada',
        'ml': 'Malayalam',
        'pa': 'Punjabí',
        'si': 'Cingalés',

    };

    fetch(`https://ws.detectlanguage.com/0.2/detect?q=${encodeURIComponent(text)}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');

            // Limpiar resultados anteriores
            resultDiv.innerHTML = '';

            if (data && data.data && data.data.detections && data.data.detections.length > 0) {
                // Obtener la sigla del idioma detectado
                const detectedLanguageCode = data.data.detections[0].language;

                // Obtener el nombre completo del idioma a partir de la sigla
                const detectedLanguage = languageMappings[detectedLanguageCode] || 'Desconocido';

                // Mostrar datos en la página
                resultDiv.innerHTML = `<p><strong>Idioma detectado:</strong> ${detectedLanguage}</p>`;
            } else {
                // Mostrar un mensaje si no se detecta ningún idioma
                resultDiv.textContent = 'Error al detectar el lenguaje.';
            }
        })
        .catch(error => {
            console.error('Error detecting language:', error.message);
            document.getElementById('result').innerHTML = 'Error detecting language. Please try again.';
        });
}
