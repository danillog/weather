import { getHours } from 'date-fns';
import React, { Component } from 'react';
import './App.css';
import Alert from './components/Alert';
import Hourly from './components/Hourly';
import Seven from './components/Seven';
import nominatim from './nominatim';
import openWeather from './openWeather';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      weatherWeek : '',
      weatherHour: 'disable',
      activeWeek: 'active',
      activeHour: '',
      city: '',
      lat: '0',
      lon: '0',
      weather: false,
      options: [],
      typeInterval: 0,
    }
  this.changeContentHour = this.changeContentHour.bind(this);
  this.sucessCurrentPosition = this.sucessCurrentPosition.bind(this);
  this.getCity = this.getCity.bind(this);
  this.changecity = this.changecity.bind(this);
  }

  componentDidMount(){
    let dateNow = getHours(new Date())
    let color = "grey";
    if(dateNow < 8 ){
      color = "#e8971c"
    }else if(dateNow < 15) {
      color = "#2cc8d0"
    }else if( dateNow < 17){
      color = "#e29623"
    }else{
      color = "#5223e2"
    }
    document.body.style.backgroundColor = color;
    document.getElementById("menu").style.backgroundColor = color;
    navigator.geolocation.getCurrentPosition(this.sucessCurrentPosition)

  }

  async weatherNow(lat, lon){
    let weather = await openWeather.weatherbyLocation(lat, lon);
    return weather;
  }

  async  sucessCurrentPosition(pos){  
    var crd = pos.coords;
    let local ={lat: crd.latitude , lon:crd.longitude}
    let city = await nominatim.acessLocation(local.lat, local.lon)
    let weather = await openWeather.weatherbyLocation(local.lat, local.lon);

    this.setState({
      city: city.["0"].address.city,
      lat: local.lat,
      lon: local.lon,
      weather: weather
    });
  }

  changeContentHour(){
    this.setState({
      weatherHour: '',
      weatherWeek: 'disable',
      activeWeek: '',
      activeHour: 'active'
    })
  }
  changeContentWeek(){
    this.setState({
      weatherHour: 'disable',
      weatherWeek: '',
      activeWeek: 'active',
      activeHour: ''
    })
  }

  async getCity(e){
    e.preventDefault();

    this.setState({weather:false})

    let city = this.state.city
    let cityLocation = await nominatim.searchByCity(city)
    let lat = cityLocation.["0"].lat;
    let lon = cityLocation.["0"].lon;
    let weather = await this.weatherNow(lat, lon)

    this.setState({
      lat: lat,
      lon: lon,
      weather: weather
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
          <div className="justify-content-center row"> 
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
          <ul className="nav nav-tabs justify-content-center menu ">
            <li className="nav-item">
              <button className={`nav-link semana ${this.state.activeWeek}`} onClick={() => this.changeContentWeek() }
              > 8 dias </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link hora ${this.state.activeHour}`} onClick={()=> this.changeContentHour() } 
              >Hora em hora </button>
            </li>
          </ul>
        </div>
        <div id="conteudo">
          <Alert weather={this.state.weather}/>
          <div className={this.state.weatherWeek}>
            <Seven weather={this.state.weather} />
          </div>
          <div className={this.state.weatherHour}>
            <Hourly weather={this.state.weather}  />
          </div>
        </div>


      </div>
    )
  }
}

export default App;
