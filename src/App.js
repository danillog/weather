import { getHours } from 'date-fns';
import React, { useEffect, useState } from 'react';
import nominatim from './api/nominatim';
import openWeather from './api/openWeather';
import './App.css';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Seven from './components/Seven';
import { weatherContext } from './components/weatherContext';

export default function App() {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('0');
  const [lon, setLon] = useState('0');
  const [weather, setWeather] = useState(false);
  const [pollution, setPollution] = useState(false);
  const [options, setOptions] = useState([]);

  

  useEffect(() => {
    let dateNow = getHours(new Date())
    let color = "grey";
    let colorMenu = "black";
    
    if(dateNow < 8 ){
      color = "#e8971c";
      colorMenu= "rgba(168,109,19,1)";
    }else if(dateNow < 15) {
      color = "#2cc8d0";
      colorMenu = "rgba(34,116,120,1)";
    }else if( dateNow < 17){
      color = "#e29623";
      colorMenu= "rgba(168,109,19,1)";
    }else{
      color = "#0c012d";
      colorMenu = "linear-gradient(0deg, rgb(12 1 45) 1%, rgb(54, 21, 153) 80%)";
    }
    document.body.style.backgroundColor = color;
    document.getElementById("menu").style.background = colorMenu;
    document.getElementById("footer").style.background = colorMenu;
  });

   async function weatherNow(lat, lon){
    let weather = await openWeather.weatherbyLocation(lat, lon);
    return weather;
  }
  async function pollutionNow(lat, lon){
    let pollution = await openWeather.pollutionByLocation(lat, lon);
    return pollution;
  }

  async function sucessCurrentPosition(pos){  
    var crd = pos.coords;
    let local ={setLat: crd.latitude , setLon:crd.longitude}
    setCity = await nominatim.acessLocation(local.lat, local.lon)
    setWeather = await openWeather.weatherbyLocation(local.lat, local.lon);
    setPollution = await openWeather.pollutionByLocation(local.lat, local.lon);

  }


  async function getCity(e){
    e.preventDefault();

    setWeather = false;
    setPollution = false;

    let cityLocation = await nominatim.searchByCity(city)
    setLat = cityLocation.["0"].lat;
    setLon = cityLocation.["0"].lon;
    setWeather = await this.weatherNow(lat, lon);
    setPollution = await this.pollutionNow(lat, lon);

  }

  function changecity(typed){
    let listCity = []
    setCity = typed
    
    if(this.state.typeInterval) clearTimeout(this.state.typeInterval)
    this.state.typeInterval = setTimeout( async () => {
      listCity = await searchCity(typed);
      setOptions = listCity;
    },200)

  }

  async function searchCity(typed){
    let typedSearch = await nominatim.seekingCity(typed)
    let listResult = []
    typedSearch.map((city) => {
      listResult.push(`${city.address.city}, ${city.address.state}, ${city.address.country}`)    
    })
    return listResult
  }
    return(
      <weatherContext.Provider value={weather}> 
        <div className="App">
          <div id="menu">
          <div className="align-items-center row header"> 
      <div className="col">
        <h1 id="titulo"> DG-WEATHER</h1>
      </div>
        <div className="col"> 
          <form onSubmit={getCity} id="buscar" >
            <input type="txt" autoComplete="off" list="datalistOptions" autoFocus value={city}
            onChange={(e) => changecity(e.target.value)} placeholder="Digite sua cidade" />
            <div id="datalistOptions" >
              { options !== undefined ?(  options.map((option, index) =>{
                return(
                  <div className="cityOption" key={index} onClick={() => changecity(option)}  >
                    <button>  {option} </button>
                </div>
                )})  
              ) : <div></div>}
            </div>
          </form>
        </div>
      </div>
          </div>
          <div id="conteudo">
            <Alert />
            <div>
              <Seven weather={weather} />
            </div>
          </div>
        <Footer />
        </div>
      </weatherContext.Provider>
    );
}

