function buscarImagen() {
    var paisAbreviatura = document.getElementById('countryInput').value.toUpperCase();
    
    // Utilizar la API de Unsplash para buscar imágenes relacionadas con el país
    var apiUrl = `https://api.unsplash.com/photos/random?query=${paisAbreviatura}&client_id=w6wOgpyvHdyCJUmF0sgROhm9TPRQ-Te8JQ0yggfyMmI`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var imagenContainer = document.getElementById('imagenContainer');
            imagenContainer.innerHTML = '';
            
            if (data.urls && data.urls.full) {
                var imagen = document.createElement('img');
                imagen.src = data.urls.full;
                imagen.alt = `Imagen de ${paisAbreviatura}`;
                imagenContainer.appendChild(imagen);
            } else {
                imagenContainer.innerHTML = 'Imagen no encontrada';
            }
        })
        .catch(error => {
            console.error('Error al obtener la imagen:', error);
        });
}
