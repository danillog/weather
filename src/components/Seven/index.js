import { fromUnixTime, getDay, lightFormat } from 'date-fns';
import { Component } from 'react';
import openWeather from '../../openWeather';
import './Seven.css';

class Seven extends Component{
  constructor(props){
    super(props);
    this.state = {
      weather: false,
      week: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
    }
    this.createList = this.createList.bind(this)
  }
  componentDidMount(){
    this.createList();
  }

  async createList(){
    let sevenDays = await openWeather.weatherbyLocation(this.props.latitude, this.props.longitude);
    this.setState({ 
      weather: sevenDays,
      previousLat: this.props.latitude,
      previousLon: this.props.longitude
    })
  }

  render(){
    
    return this.state.weather !== false & this.state.weather !== undefined ?(
        <div id="weather">
        { this.state.weather.daily.map((day, index ) => {
          let dayTime = lightFormat(fromUnixTime(day.dt), 'dd/MM/yyyy')
          let dayInWeek = getDay(fromUnixTime(day.dt))
          let week = this.state.week
          if(day.rain === undefined){
            day.rain = 0
          }
          return( 
            <div className="container" key={ index } >    
              <div className="row dayTime justify-content-md-center">
                { `${week[dayInWeek]} ${dayTime}` }
              </div>
              <div className="row dayWeather justify-content-md-center">
                <div className="col col-lg-2 weatherIcon">
                  <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Icone de clima atual" />
                </div>
                <div className="col col-lg-2 weatherTemp">
                  <p>Min { day.temp.min }ºC </p> <p>Max { day.temp.max }ºC </p>
                </div>
                <div className="col-md-auto weatherDescri ">
                  <h3> { day.weather[0].description } </h3>
                </div>
              </div>
              <div className="row detailsWeather justify-content-md-center">
                <div className="col col-lg-2 tempTime">
                  <h3>Manhã : {day.temp.morn}ºC </h3>
                </div>
                <div className="col col-lg-2 tempTime">
                  <h3>Tarde : {day.temp.day}ºC </h3>
                </div>
                <div className="col col-lg-2 tempTime">
                  <h3>Noite : {day.temp.eve}ºC </h3>
                </div>
                <div className="col col-lg-3 prob">
                  <h3> Probabilidade chuva: {day.pop * 100}% </h3>
                </div>
                <div className="col col-lg-3 prob">
                  <h3>{day.rain}mm </h3>
                </div>
              </div>
            </div>
          )})}
        </div>
    ) :  <h1> Carregando... </h1>
  }
}

export default Seven;