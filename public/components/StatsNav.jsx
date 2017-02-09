import StatSpinner from './StatSpinner.jsx'
import { Navbar, NavItem, Row, Input, Icon, Button } from 'react-materialize';

// This is the component that represents the navbar
class StatsNav extends React.Component{
  constructor(props){
  	super(props);

  }

  // Handles click on Get User Button
  handleClick() {
    this.props.getUserClick()
  }

  render(){
  	return(
  	  <Navbar right>
        <NavItem href='/'>
          <img src="../img/rippl-sml.png" className="brand-logo right ripplnav"/>
        </NavItem>
          {this.props.spinner ? <NavItem><StatSpinner /></NavItem> : ''}
          {this.props.error ? <NavItem>Invalid Twitter Handle</NavItem> : ''}
          <NavItem>
          <img src={JSON.parse(window.localStorage.profile).picture} />

        </NavItem>
        <NavItem>
         {'Hi ' + JSON.parse(window.localStorage.profile).name}
        </NavItem>
        <NavItem>
          <Input onChange={this.props.formChange} label="New User" value={this.props.formVal}><Icon>account_circle</Icon></Input>
        </NavItem>
        <NavItem>
          <Button onClick={this.handleClick.bind(this)} waves='light'>Get User</Button>
        </NavItem>
      </Navbar>
  	);
  }
}

export default StatsNav;