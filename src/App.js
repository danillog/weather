import { getHours } from 'date-fns';
import React, { Component } from 'react';
import './App.css';
import Alert from './components/Alert';
import Hourly from './components/Hourly';
import Seven from './components/Seven';
import nominatim from './nominatim';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      weatherWeek : <Seven latitude="-23.5329" longitude="-46.6395" />,
      weatherHour: '',
      activeWeek: 'active',
      activeHour: '',
      city: '',
      lat: '',
      lon: ''
    }
  this.changeContentHour = this.changeContentHour.bind(this);
  this.sucessCurrentPosition = this.sucessCurrentPosition.bind(this);
  this.searchCity = this.searchCity.bind(this);
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

  async  sucessCurrentPosition(pos){  
    var crd = pos.coords;
    let lat = crd.latitude
    let lon =  crd.longitude
    let city = await nominatim.acessLocation(lat, lon)
    

    this.setState({
      lat : lat,
      lon: lon,
      city: city.["0"].address.city,
      weather : <Seven latitude={lat} longitude={lon} />
    });
  }

  changeContentHour(){
    this.setState({
      weatherHour: <Hourly latitude={this.state.lat} longitude={this.state.lon}  />,
      weatherWeek: '',
      activeWeek: '',
      activeHour: 'active'
    })
  }
  changeContentWeek(){
    this.setState({
      weatherWeek: <Seven latitude={this.state.lat} longitude={this.state.lon} />,
      weatherHour: '',
      activeWeek: 'active',
      activeHour: ''
    })
  }
  async searchCity(e){
    e.preventDefault();

    let city = this.state.city
    let cityLocation = await nominatim.searchByCity(city)
    let lat = cityLocation.["0"].lat;
    let lon = cityLocation.["0"].lon;
    let weatherWeek = this.state.weatherWeek;
    let weatherHour = this.state.weatherHour;

    if(weatherHour !== ''){
      this.setState({
        lat: lat,
        lon: lon,
        weatherHour: <Hourly latitude={lat} longitude={lon}  />
      })
    }else  if(weatherWeek !== '' ){
      this.setState({
        lat: lat,
        lon: lon,
        weatherWeek: <Seven latitude={lat} longitude={lon} />
      })
    }

  }


  render(){
    return(
      <div className="App">
        <div id="menu">
          <div className="justify-content-center row"> 
            <form onSubmit={this.searchCity} id="buscar" >
              <input type="txt" autoComplete="off" autoFocus value={this.state.city}
              onChange={(e) => this.setState({city: e.target.value})}  placeholder="Digite sua cidade" 
              />
              <button type="submit"> Buscar </button>
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
          <Alert latitude={this.state.lat} longitude={this.state.lon} />
          {this.state.weatherWeek}
          {this.state.weatherHour}
        </div>


      </div>
    )
  }
}

export default App;
