const languageInput = document.getElementById('languageInput');
const searchButton = document.getElementById('searchButton');
const countryTableBody = document.getElementById('countryTableBody');

searchButton.addEventListener('click', () => {
  const language = languageInput.value;

  if (!language) {
    alert('Por favor, ingrese un idioma');
    return;
  }

  const apiUrl = `https://restcountries.com/v3.1/lang/${language}`;

  // Realizar una solicitud GET a la API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de la API');
      }
      return response.json();
    })
    .then(data => {
      // Limpiar la tabla antes de agregar nuevos resultados
      countryTableBody.innerHTML = '';
    
      if (data.length === 0) {
        const row = countryTableBody.insertRow(0);
        const cell = row.insertCell(0);
        cell.textContent = 'No se encontraron países que hablen este idioma.';
      } else {
        // Inicializar un contador para numerar las filas
        let rowNum = 1;
    
        // Manipula los datos obtenidos de la API
        data.forEach(country => {
          const row = countryTableBody.insertRow(-1);
          const cellNum = row.insertCell(0);
          const cellCountry = row.insertCell(1);
    
          // Agregar el número secuencial
          cellNum.textContent = rowNum;
          rowNum++;
    
          // Agregar el nombre del país
          cellCountry.textContent = country.name.common;
        });
      }
    })
    .catch(error => {
      console.error('Ocurrió un error al obtener los datos:', error);
    });
});
