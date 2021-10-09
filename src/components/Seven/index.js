import { fromUnixTime, getDay, isSameDay, lightFormat } from 'date-fns';
import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loading from '../Loading';
import './Seven.css';

class Seven extends Component{
  constructor(props){
    super(props);
    this.state = {
      week: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
     
    }
  }
  render(){
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 12,
      slidesToScroll: 12,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    };
    return this.props.weather !== false & this.props.weather !== undefined ?(
        <div id="weather">
        { this.props.weather.daily.map((day, index ) => {
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
                  <p>Min { day.temp.min.toFixed(0) }ºC </p> <p>Max { day.temp.max.toFixed(0) }ºC </p>
                </div>
                <div className="col-md-auto weatherDescri ">
                  <h3> { day.weather[0].description } </h3>
                </div>
              </div>
              <div className="row detailsWeather justify-content-md-center">
                <div className="col col-lg-2 tempTime">
                  <h3>Manhã : {day.temp.morn.toFixed(0)}ºC </h3>
                </div>
                <div className="col col-lg-2 tempTime">
                  <h3>Tarde : {day.temp.day.toFixed(0)}ºC </h3>
                </div>
                <div className="col col-lg-2 tempTime">
                  <h3>Noite : {day.temp.eve.toFixed(0)}ºC </h3>
                </div>
                <div className="col col-lg-3 prob">
                  <h3> Probabilidade chuva: {(day.pop * 100).toFixed(0)}% </h3>
                </div>
                <div className="col col-lg-3 prob">
                  <h3>{day.rain}mm </h3>
                </div>
              </div>
              <Slider { ...settings}  >
                  {this.props.weather.hourly.map((hour, index ) => {
                    let hourTime = lightFormat(fromUnixTime(hour.dt), 'HH:mm')
                    let rain = hour.rain
                    if(hour.rain === undefined || hour.rain === ''){
                      rain = 0
                    }else{
                      rain = rain["1h"]
                    } 
                    if( isSameDay(fromUnixTime(hour.dt), fromUnixTime(day.dt))){
                      return(
                        <div className="weatherHour"> 
                          <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="Imagm do clima nesse horário" />
                          <span> {hour.temp.toFixed(0)} ºC </span>
                          <span> { hourTime }h </span>
                        </div>
                      )
                    }
                  })}
              </Slider>  
            </div>
          )})}
        </div>
    ) :  <Loading />
  }
}

export default Seven;