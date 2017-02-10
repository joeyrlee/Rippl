import StatsBox from './StatsBox.jsx'
import { Col, Card } from 'react-materialize';


// This is the component that represents the cards holding data on each user
class StatsCard extends React.Component{
  constructor(props){
    super(props);

    this.getTitle = this.getTitle.bind(this);
    this.getTwitterLink = this.getTwitterLink.bind(this);
    this.getScoreColor = this.getScoreColor.bind(this);
    this.getPositionType = this.getPositionType.bind(this);
  }

  getTitle() {
    //if the sentiment score is for a user
    if (this.props.user.twitterHandle) {
      return '@' + this.props.user.twitterHandle;
    //if the sentiment score is for a topic
    } else if (this.props.user.topic) {
      return this.props.user.topic;
    //else the sentiment score must be for a location
    } else {
      return this.props.user.location;
    }
  }

  getTwitterLink() {
    //if the sentiment score is for a user
    if (this.props.user.twitterHandle) {
      return 'https://twitter.com/' + this.props.user.twitterHandle;
    //if the sentiment score is for a topic
    } else if (this.props.user.topic) {
      return 'https://twitter.com/search?q='
        + this.props.user.topic 
        + '&src=typd';
    //else the sentiment score must be for a location
    } else {
      https://twitter.com/search?q=san%20francisco&src=typd
      return 'https://twitter.com/search?q='
        //IIFE to convert space delimited city names to '%20' delimited strings
        + (()=>this.props.user.location.split(' ').join('%20'))()
        + '&src=typd'
    }
  }

  getPositionType() {
    //if the sentiment score is for a user
    if (this.props.user.twitterHandle) {
      return 'center';
    //if the sentiment score is for a topic
    } else if (this.props.user.topic) {
      return 'left';
    //else the sentiment score must be for a location
    } else {
      return 'right';
    }
  }

  getScoreColor() {
    let score = this.props.user.sentimentScore;

    if (score * 1000 >= 600) {
      return '#8bc34a';
    } else if (score < 600 && score > 0) {
      return 'yellow';
      //if score couldn't be retrieved or yielded no rating
    } else if (score === 0) {
      return 'white';
    } else {
      return 'red';
    }
  }

  render(){
  	return (
      <Col m={6} s={12}>
        <Card
          className='blue-grey darken-1 white-text' 
          textClassName='white-text' 
          title={this.getTitle()}
          actions={[<a href={this.getTwitterLink()}>To Twitter</a>]}
        >
          <StatsBox 
            score={this.props.user.sentimentScore} 
            retweet={this.props.user.retweetCount} 
            color={this.getScoreColor()}
            user={this.props.user}
          />
        </Card>
      </Col>
    );
  }
}

export default StatsCard;