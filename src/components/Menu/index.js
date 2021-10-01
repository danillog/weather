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
              <form onSubmit={this.getCity} id="buscar" >
                <input type="txt" autoComplete="off" list="datalistOptions" autoFocus value={this.state.city}
                onChange={(e) => this.changecity(e.target.value)} placeholder="Digite sua cidade" />
                <div id="datalistOptions" >
                  {this.state.options.map((option, index) =>{
                    return(
                      <div className="cityOption" key={index} onClick={() => this.changecity(option)}  >
                        <button>  {option} </button>
                    </div>
                    )}  
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Menu;