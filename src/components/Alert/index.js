import React, { useContext, useEffect, useState } from "react";
import { weatherContext } from '../weatherContext';
import './alert.css';

export default function Alert(){
  const [weather, setWeather] = useContext(weatherContext);
  const [pollution, setPollution] = useContext(weatherContext);
  const [currentPollution, setCurrentPollution] = useState('');


  useEffect(() => {
    if(pollution !== false){
      let levelAir = 0
      pollution.map((air) => {
       levelAir = air.main.aqi
      });
      console.log(pollution)
      switch(levelAir){
        case '1': {
          setCurrentPollution(<div className="dayPollution good"> </div>)
          break;
        }
        case '2': {
          setCurrentPollution(<div className="dayPollution fair"> </div>)
          break;
        }
        case '3': {
          setCurrentPollution(<div className="dayPollution moderate"> </div>)
          break;
        }
        case '4': {
          setCurrentPollution(<div className="dayPollution bad"> </div>)
          break;
        }
        case '5': {
          setCurrentPollution(<div className="dayPollution veryBad"> </div>)
          break;
        }

      }
    }
  })

  return weather !== false & weather !== undefined  & weather.alerts !== undefined & pollution !== false ?(
    <div id="alert">
      <div className="container">
        <div className="row weatherAlertTitle justify-content-md-center">
          <h2> Alertas nacionais para sua região </h2>
        </div>
      </div>
    { weather.alerts.map((alert, index ) => {
      return( 
        <div className="container" key={ index } >    
          <div className="row weatherAlert justify-content-md-center">
            <h3> { alert.event } </h3>
          </div>
          <div className="row detailAlert justify-content-md-center">
            <h3> O {alert.description} </h3>
          </div>
        </div>
      )})}
      <div  className="row pollution justify-content-md-center">
            <div className="col-4 ">
              <img src={pollution} alt="pollution level"/>
              <h3> Poluição do ar</h3>
            </div>
            <div className="col-4">
              {currentPollution}
            </div>
      </div>

    </div>
  ) :  <h1>  </h1>
  
}
