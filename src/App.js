import { getHours } from 'date-fns';
import React, { Component } from 'react';
import nominatim from './api/nominatim';
import openWeather from './api/openWeather';
import './App.css';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Seven from './components/Seven';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      city: '',
      lat: '0',
      lon: '0',
      weather: false,
      pollution: false,
      options: [],
      typeInterval: 0,
    }
  this.sucessCurrentPosition = this.sucessCurrentPosition.bind(this);
  this.getCity = this.getCity.bind(this);
  this.changecity = this.changecity.bind(this);
  }

  componentDidMount(){
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
    navigator.geolocation.getCurrentPosition(this.sucessCurrentPosition)

  }

  async weatherNow(lat, lon){
    let weather = await openWeather.weatherbyLocation(lat, lon);
    return weather;
  }
  async pollutionNow(lat, lon){
    let pollution = await openWeather.pollutionByLocation(lat, lon);
    return pollution;
  }

  async  sucessCurrentPosition(pos){  
    var crd = pos.coords;
    let local ={lat: crd.latitude , lon:crd.longitude}
    let city = await nominatim.acessLocation(local.lat, local.lon)
    let weather = await openWeather.weatherbyLocation(local.lat, local.lon);
    let pollution = await openWeather.pollutionByLocation(local.lat, local.lon);


    this.setState({
      city: city.["0"].address.city,
      lat: local.lat,
      lon: local.lon,
      weather: weather,
      pollution: pollution
    });
  }


  async getCity(e){
    //para não atualizar a página 
    e.preventDefault();

    this.setState({weather:false})

    let city = this.state.city
    let cityLocation = await nominatim.searchByCity(city)
    let lat = cityLocation.["0"].lat;
    let lon = cityLocation.["0"].lon;
    let weather = await this.weatherNow(lat, lon);
    let pollution = await this.pollutionNow(lat, lon);

    this.setState({
      lat: lat,
      lon: lon,
      weather: weather,
      pollution: pollution
    })
  }

  changecity(typed){
    let listCity = []
    
    this.setState({
      city: typed,
    })
    
    if(this.state.typeInterval) clearTimeout(this.state.typeInterval)
    this.state.typeInterval = setTimeout( async () => {
      listCity = await this.searchCity(typed);
      this.setState({options: listCity})
    },200)
  }

  async searchCity(typed){
    let typedSearch = await nominatim.seekingCity(typed)
    let listResult = []
    typedSearch.map((city) => {
      listResult.push(`${city.address.city}, ${city.address.state}, ${city.address.country}`)    
    })
    return listResult
  }
  render(){
    return(
      <div className="App">
        <div id="menu">
          <div className="align-items-center row header"> 
          <div className="col">
            <h1 id="titulo"> DG-WEATHER</h1>
          </div>
            <div className="col"> 
              <form onSubmit={this.getCity} id="buscar" >
                <input type="txt" autoComplete="off" list="datalistOptions" autoFocus value={this.state.city}
                onChange={(e) => this.changecity(e.target.value)} placeholder="Digite sua cidade" />
                <div id="datalistOptions" >
                  {this.state.options.map((option, index) =>{
                    return(
                      <div className="cityOption" key={index} onClick={() => this.changecity(option)}  >
                        <button>  {option} </button>
                    </div>
                    )}  
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="conteudo">
          <Alert weather={this.state.weather} pollution={this.state.pollution}/>
          <div>
            <Seven weather={this.state.weather} />
          </div>
        </div>
       <Footer />

      </div>
    )
  }
}

export default App;
