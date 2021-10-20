import { Component } from 'react';
import pollution from '../../assets/img/pollution.png';
import './alert.css';

class Alert extends Component{
  constructor(props){
    super(props);
    this.state = {
      weatherAlert: false,
      pollutionAlert: false
    }
  }

  componentDidMount(){
    this.setState({
      pollutionAlert: this.props.pollution
    })
    console.log(this.props.pollution)
    console.log(this.props.weather)
  }

  airQuality(){
    if(this.state.pollutionAlert !== false){
      let pollution = this.state.pollutionAlert
      let levelAir = 0
      pollution.map((air) => {
       levelAir = air.main.aqi
      });
      console.log(pollution)
      switch(levelAir){
        case '1': {
          return(<div className="dayPollution good"> </div>)
        }
        case '2': {
          return(<div className="dayPollution fair"> </div>)
        }
        case '3': {
          return(<div className="dayPollution moderate"> </div>)
        }
        case '4': {
          return(<div className="dayPollution bad"> </div>)
        }
        case '5': {
          return(<div className="dayPollution veryBad"> </div>)
        }

      }
    }
  }

  render(){
    
    return this.props.weather !== false & this.props.weather !== undefined  & this.props.weather.alerts !== undefined & this.props.pollution !== false ?(
        <div id="alert">
        { this.props.weather.alerts.map((alert, index ) => {
          return( 
            <div className="container" key={ index } >    
              <div className="row weatherAlert justify-content-md-center">
                <h3> { alert.event } </h3>
              </div>
              <div className="row detailAlert justify-content-md-center">
                <h3> O {alert.description} </h3>
              </div>
              <div  className="row pollution justify-content-md-center">
                <div className="col-4 ">
                  <img src={pollution} alt="pollution level"/>
                  <h3> Poluição do ar</h3>
                </div>
                <div className="col-4">
                {this.airQuality()}
              </div>
              </div>
            </div>
          )})}
        </div>
    ) :  <h1>  </h1>
  }
}

export default Alert;