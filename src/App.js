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
    let colorMenu = "black";
    let colorFooter = "black";
    
    if(dateNow < 8 ){
      color = "#e8971c";
      colorMenu= "linear-gradient(0deg, rgba(255,255,255,0) 1%, rgba(168,109,19,1) 37%)";
      colorFooter= "linear-gradient(180deg, rgba(255,255,255,0) 1%, rgba(168,109,19,1) 37%)";
    }else if(dateNow < 15) {
      color = "#2cc8d0";
      colorMenu = "linear-gradient(0deg, rgba(255,255,255,0) 1%, rgba(34,116,120,1) 37%)";
      colorFooter = "linear-gradient(180deg, rgba(255,255,255,0) 1%, rgba(34,116,120,1) 37%)";
    }else if( dateNow < 17){
      color = "#e29623";
      colorMenu= "linear-gradient(0deg, rgba(255,255,255,0) 1%, rgba(168,109,19,1) 37%)";
      colorFooter= "linear-gradient(180deg, rgba(255,255,255,0) 1%, rgba(168,109,19,1) 37%)";
    }else{
      color = "#0c012d";
      colorMenu = "linear-gradient(0deg, rgb(12 1 45) 1%, rgb(54, 21, 153) 80%)";
      colorFooter = "linear-gradient(180deg, rgb(12 1 45) 1%, rgb(54, 21, 153) 80%)"
    }
    document.body.style.backgroundColor = color;
    document.getElementById("menu").style.background = colorMenu;
    document.getElementById("footer").style.background = colorFooter;
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
    //para não atualizar a página 
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
          <div className="align-items-center row"> 
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
          <Alert weather={this.state.weather}/>
          <div className={this.state.weatherWeek}>
            <Seven weather={this.state.weather} />
          </div>
          <div className={this.state.weatherHour}>
            <Hourly weather={this.state.weather}  />
          </div>
        </div>
        <footer id="footer"> 
          <div class="">
            <div class="card-body">
              <p className="footerP" >©COPYRIGHT 2021. ALL RIGHTS RESERVED.</p>
              <p className="footerP" > Create by <a href="https://danilogomes.dev" target="_blank" > Danillo </a> </p>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

export default App;
