import { Component } from 'react';
import openWeather from '../../openWeather';
import './Menu.css';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      city: "",

    }
  }
  async componentDidMount(){
    let alert = await openWeather.weatherbyLocation(this.props.latitude, this.props.longitude);
    this.setState({ weatherAlert: alert})
  }

  render(){
    return(
        <div id="menu">
          <div className="justify-content-center row"> 
          <div className="col">
            <h2> TEST</h2>
          </div>
            <div className="col"> 
            
            </div>
          </div>
        </div>
    );
  }
}

export default Menu;