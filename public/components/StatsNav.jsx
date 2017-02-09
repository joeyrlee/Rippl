import StatSpinner from './StatSpinner.jsx'
import { Navbar, NavItem, Dropdown, Row, Input, Icon, Button } from 'react-materialize';

// This is the component that represents the navbar
class StatsNav extends React.Component{
  constructor(props){
  	super(props);

    this.state = {
      selected: 'twitterHandle',
      labels: { //can be: Twitter Handle, Topic, or Location
        'twitterHandle': 'Twitter Handle', 
        'topic': 'Topic',
        'location': 'Location'
      },
      icons: {
        'twitterHandle': 'account_circle', //can be: account_circle for users, room for location, or info_outline for topic
        'topic': 'info_outline',
        'location': 'room'
      }
    }
  }

  handleRadioSelect(event) {
    this.props.handleSearchTypeChange(event);
    this.setState({'selected': event.target.value});
  }

  // Handles click on Get User Button
  handleClick() {
    this.props.getUserClick();
  }

  render(){
  	return(
  	  <Navbar right>
        <NavItem href='/'>
          <img src='../img/rippl-sml.png' className='brand-logo left ripplnav'/>
        </NavItem>

        <NavItem>
          <Dropdown trigger={
            <Button className=''>Search Type:</Button>
          }>
            <div>
              <Input 
                name='group1'
                type='radio'
                value='twitterHandle'
                label='Twitter Handle'
                className='left with-gap' 
                id='userRadioButton'
                onClick={this.handleRadioSelect.bind(this)}
              />
              <NavItem divider />
              <Input 
                name='group1'
                type='radio'
                value='topic'
                label='Topic'
                className='left with-gap'
                onClick={this.handleRadioSelect.bind(this)}
              />
              <NavItem divider />
              <Input 
                name='group1'
                type='radio'
                value='location'
                label='Location'
                className='left with-gap' 
                onClick={this.handleRadioSelect.bind(this)}
              />
            </div>
          </Dropdown>
        </NavItem>

        {this.props.spinner ? <NavItem><StatSpinner /></NavItem> : ''}
        {this.props.error ? <NavItem>Invalid Twitter Handle</NavItem> : ''}

        <NavItem>
          <Input 
            onChange={this.props.formChange}
            label={this.state.labels[this.state.selected]}
            value={this.props.formVal}
          >
            <Icon>{this.state.icons[this.state.selected]}</Icon>
          </Input>
        </NavItem>

        <NavItem>
          <Button 
            onClick={this.handleClick.bind(this)} 
            waves='light'>Get Score
          </Button>
        </NavItem>
      </Navbar>
  	);
  }
}

export default StatsNav;