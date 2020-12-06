class openWeather{
  constructor(){
  }

  acess(lat, lon){
    let route = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&lang=pt_br&units=metric&appid=bc652e278099aa2998ce62e504d94b9c`
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

