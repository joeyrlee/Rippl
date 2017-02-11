import StatSpinner from './StatSpinner.jsx'
import { Col, Row, Card, CardPanel } from 'react-materialize';


// This is the component that represents the box that displays the data
class StatsCard extends React.Component{
  constructor(props){
  	super(props);

    this.inactiveUser = this.inactiveUser.bind(this);
  }

  inactiveUser() {
    return 'Selected Twitter Handle Inactive';
  }

  render(){
    console.log("StatsBox; this.props.user: ",this.props.user);
  	return (
      <div className="statsbox">
        <Row>
          <Col s={3} m={3} l={3}>
            <p id="scoreColor" 
               style={{color:this.props.color,
                       display:'inline-block',
                       width: '1250px'}}
                >Rippl Score: {
                  this.props.score 
                  ? Math.floor(this.props.score * 1000) 
                  : this.inactiveUser()}
            </p>
          </Col>
        </Row>
      </div>
  	);
  }
}

export default StatsCard;