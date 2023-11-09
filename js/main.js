const api = {
  key: '951cf45d4fe81c27265614dd4b420c96',
  url: `https://api.openweathermap.org/data/2.5/weather`
}
//creamos variables para asiganrles del form que tenemos en el html 
const card = document.getElementById('card')
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

 window.addEventListener('load',()=> {
//   let long
//   let lat

//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(posicion =>{
//       console.log(posicion);

//      long = posicion.coords.longitude
//      lat = posicion.coords.latitude
     
//      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude={part}&appid=951cf45d4fe81c27265614dd4b420c96`
//     })
//   }
  
})

//funcion para obtener la fecha actual 
function getCurrentDate() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('es', options);
}

//funcion para actualizar las imagenes dependiendo de un rango de temperatura
function updateImages(data) {

  let src = 'images/day.svg';
  switch(data.weather[0].main){
   
    case 'Thunderstorm':
      src='images/thunder.svg'
    
      break;
    case 'Drizzle':
      src='images/rainy-2.svg'
   
      break;
    case 'Rain':
      src='images/rainy-7.svg'
     
      break;
    case 'Snow':
      src='images/snowy-6.svg'
   
      break;                        
    case 'Clear':
        src='images/day.svg'
       
      break;
    case 'Atmosphere':
      src='images/weather.svg'
       
        break;  
    case 'Clouds':
       src='images/cloudy-day-1.svg'
        break;  
    default:
    src='images/cloudy-day-1.svg'
    
  }
  tempImg.src = src;
}
//funcion de tipo async o asincrona  para recibir la informacion de la api mendiante el link de call o llamda
async function search(query) {
  try {
   // obtenemos la informacion con fetch con la queri mediante la url del api y la recibimos mendiante json
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
    const data = await response.json();

    card.style.display = 'block';
    //reemplazamos los datos por la variables que nos regresa la api 
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    data.innerHTML = (new Date()).toLocaleDateString();
    temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
    // Mostrar la fecha actual
    date.innerHTML = getCurrentDate();
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)}°c / ${toCelsius(data.main.temp_max)}°c`;
    viento.innerHTML = `viento: ${data.wind.speed} m/s`;
    //mandamos a llamar la funcion de actualizacion de imagenes
    updateImages(data);
    //nuestro catch por si existe algun error
  } catch (err) {
    console.log(err);
    alert('Hubo un error');
  }
}
//funcion para conversion de farenheit a celsius porque
//el api no da esa conversion
function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
//funcion al momento de darle enter el buscador evitando que se recarge o rederendizacion
function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}
//obtenemos los elementos de la id del formulario y de la informacion de la  barra de busqueda 
const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
//corremos una funcion si se realiza un enter al buscador 
searchform.addEventListener('submit', onSubmit, true);
