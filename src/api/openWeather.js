import config from "../config/config";

class openWeather{
  acess(lat, lon){
    let key = config;
    let route = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&lang=pt_br&units=metric&appid=${key}`
    let requestWeather =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  

    let dataWeather =   requestWeather.then(result =>{ return result }, err => {  dataWeather = err });
    return dataWeather
  }
  
  weatherbyLocation(lat , lon){
    let sevenWeather =  this.acess(lat, lon)
    return sevenWeather;
  }
}

export default new openWeather();

