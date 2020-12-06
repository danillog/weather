import { fromUnixTime, lightFormat } from 'date-fns';
import { Component } from 'react';
import openWeather from '../../openWeather';


class Hourly extends Component{
  constructor(props){
    super(props);
    this.state = {
      weather: false
    }
  }
  async componentDidMount(){
    let hourly = await openWeather.weatherbyLocation(this.props.latitude, this.props.longitude);
    this.setState({ weather: hourly})
  }

  render(){
    
    return this.state.weather !== false & this.state.weather !== undefined ?(
        <div id="weather">
        { this.state.weather.hourly.map((hour, index ) => {
          let hourTime = lightFormat(fromUnixTime(hour.dt), 'HH:mm')
          let dayHour = lightFormat(fromUnixTime(hour.dt), 'dd/MM')
          let prop = hour.pop * 100;
          let rain = hour.rain
          if(hour.rain === undefined || hour.rain === ''){
            rain = 0
          }else{
            rain = rain["1h"]
          } 
          return( 
            <div className="container" key={ index } >    
              <div className="row dayTime justify-content-md-center">
                { `${hourTime}h ${dayHour}`}
              </div>
              <div className="row hourWeather justify-content-md-center">
                <div className="col col-lg-2 weatherIcon">
                  <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="Icone de clima atual" />
                </div>
                <div className="col col-lg-2 weatherTemp">
                  <p>Temperatura { hour.temp }ºC </p>
                </div>
                <div className="col-md-auto weatherDescri ">
                  <h3> { hour.weather[0].description } </h3>
                </div>
              </div>
              <div className="hourDetails row justify-content-md-center"> 
                <div className="col col-lg-2 windSpeed">
                  <p>  {`Velocidade do vento: ${hour.wind_speed}Km/h`} </p>
                </div>
                <div className="col col-lg-3 prob">
                  <p> Probabilidade de chuva: {parseInt(prop)}% </p>
                </div>
                <div className="col col-lg-3 prob">
                  <p>{`Previsão de chuva ${rain}mm`} </p>
                </div>
              </div>
            </div>
          )})}
        </div>
    ) :  <h1> Carregando... </h1>
  }
}

export default Hourly;