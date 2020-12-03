import { fromUnixTime, getHours, lightFormat } from 'date-fns';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      weather:{},
      good: 0
    };
  }

  componentDidMount(){

    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=-23.5489&lon=-46.6388&exclude=hourly,minutely,current&lang=pt_br&units=metric&appid=bc652e278099aa2998ce62e504d94b9c";
    fetch(url)
      .then((r)=> r.json())
      .then((json) => {
        this.setState({ 
          weather: json,
          good: 1
        })
      })


    let dateNow = getHours(new Date())
    let color = "grey";
    if(dateNow < 10 ){
      color = "#e8971c"
    }else if(dateNow < 15) {
      color = "#2cc8d0"
    }else if( dateNow < 17){
      color = "#e29623"
    }else{
      color = "#5223e2"
    }
    document.body.style.backgroundColor = color
  }
  render(){
    console.log(this.state.hour)
    return this.state.good >= 1 ? (
      <div className="App">
        <h2 id="city"> São Paulo </h2>
        <div id="weather">
        { this.state.weather.daily.map((day, index ) => {
          let dayTime = lightFormat(fromUnixTime(day.dt), 'dd-MM-yyyy')
          return( 
            <div className="container" key={ index } >    
              <div className="row dayTime justify-content-md-center">
                { dayTime }
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
            </div>
          )})}
          {this.state.weather.alert }
        </div>
      </div>
    ) : <h1> Carregando... </h1> ;
  }
}

export default App;
