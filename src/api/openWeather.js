import config from "../config/config";

class openWeather{
  acessWeather(lat, lon){
    let key = config;
    let route = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&lang=pt_br&units=metric&appid=${key}`
    let requestWeather =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  

    let dataWeather =   requestWeather.then(result =>{ return result }, err => {  dataWeather = err });
    return dataWeather
  }
  acessPollution(lat,lon){
    let key = config;
    let route = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`
    let requestPollution =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  

    let dataPollution =   requestPollution.then(result =>{ return result }, err => {  dataPollution = err });
    return dataPollution
  }
  
  weatherbyLocation(lat , lon){
    let sevenWeather =  this.acessWeather(lat, lon)
    return sevenWeather;
  }

  pollutionByLocation(lat, lon){
    let pollution =  this.acessPollution(lat, lon)
    return pollution;
  }
}

export default new openWeather();

