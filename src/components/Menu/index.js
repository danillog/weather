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
      <div className="align-items-center row header"> 
      <div className="col">
        <h1 id="titulo"> DG-WEATHER</h1>
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
    );
  }
}

export default Menu;