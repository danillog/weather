import { fromUnixTime, getDay, isSameDay, lightFormat } from 'date-fns';
import React, { useContext, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loading from '../Loading';
import { weatherContext } from '../weatherContext';
import './Seven.css';


export default function Seven(){
  const {weather} = useContext(weatherContext);
  const [week, setWeek] = useState(['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']);
  
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
  return weather !== false & weather !== undefined ?(
      <div id="weather">
      { weather.daily.map((day, index ) => {
        let dayTime = lightFormat(fromUnixTime(day.dt), 'dd/MM/yyyy')
        let dayInWeek = getDay(fromUnixTime(day.dt))
        let week = week
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
            <div className="row detailsWeather align-items-center">
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
                <h3>Precipitação: {day.rain}mm </h3>
              </div>
            </div>
            <Slider { ...settings}  >
                {weather.hourly.map((hour, index ) => {
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
                        <span className="tempDay"> {hour.temp.toFixed(0)} ºC </span>
                        <span className="timeDay"> { hourTime }h </span>
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
