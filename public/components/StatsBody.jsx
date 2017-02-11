import StatsCard from './StatsCard.jsx';
import { Navbar, NavItem } from 'react-materialize';

// This is the component that represents the part of the page where the user cards are loaded
class StatsBody extends React.Component {
  constructor(props) {
  	super(props);
  }

  render(){
    // console.log('StatsBody list: ',this.props.list);
  	return (
      <div className="statsbody">
      	{this.props.list.map((user) => <StatsCard user={user} />) }
      </div>
  	);
  }
}

export default StatsBody;