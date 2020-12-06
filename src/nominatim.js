class nominatim{
  constructor(){
  }

  acessCity(city){
    let route = `https://nominatim.openstreetmap.org/?addressdetails=1&city=${city}&format=json&limit=1`
    let requestCity =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  
   
    let dataCity =   requestCity.then(result =>{ return result }, err => {  dataCity = err });
    return dataCity
  }

  acessLocation(lat, lon){
    let route = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${lat}+${lon}&format=json&limit=1`
    let requestCity =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  

    let dataCity =   requestCity.then(result =>{ return result }, err => {  dataCity = err });
    return dataCity
  }
  
  searchByCity(cityName){
    let city =  this.acessCity(cityName)
    return city;
  }
  searchCitybyLocation(lat, lon){
    let city = this.acessLocation(lat, lon)
    return city
  }
}

export default new nominatim();

