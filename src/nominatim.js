class nominatim{
  constructor(){
  }

  acessCity(city){
    let route = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${city}&format=json&limit=1`
    let requestCity =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  
   
    let dataCity =   requestCity.then(result =>{ return result }, err => {  dataCity = err });
    return dataCity
  }

  seekingCity(text){
    let route = `https://nominatim.openstreetmap.org/?addressdetails=1&city=${text}&format=json`
    let requestCity =  fetch(route).then((r) => r.json())
    .then((json) =>  { return json })  
    let dataCity =  requestCity.then(result =>{ return this.filtreCity(result) }, err => {  dataCity = err });

    return dataCity;
  }

  filtreCity(dataCity){
    let citys = dataCity.filter((city) =>{
      if(city.address.city !== undefined){
        return city;
      }
    })
    return citys
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

