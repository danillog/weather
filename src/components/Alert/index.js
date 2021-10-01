import { Component } from 'react';
import openWeather from '../../api/openWeather';
import './alert.css';

class Alert extends Component{
  constructor(props){
    super(props);
    this.state = {
      weatherAlert: false
    }
  }
  async componentDidMount(){
    let alert = await openWeather.weatherbyLocation(this.props.latitude, this.props.longitude);
    this.setState({ weatherAlert: alert})
  }

  render(){
    
    return this.props.weather !== false & this.props.weather !== undefined  & this.props.weather.alerts !== undefined ?(
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
            </div>
          )})}
        </div>
    ) :  <h1>  </h1>
  }
}

export default Alert;