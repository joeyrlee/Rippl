import StatsNav from './StatsNav.jsx';
import StatsBody from './StatsBody.jsx';
import StatsFoot from './StatsFoot.jsx';
import StatSpinner from './StatSpinner.jsx'

// This is the component that represents the main body of the page
class Stats extends React.Component{
  constructor(props){
  	super(props);

    this.state = {
      query: '', //entered text
      queryType: 'twitterHandle', //twitterHandle, topic, or location
      list: [],
      spinner: false
    }

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.queryTopic = this.queryTopic.bind(this);
  }


  // This function gets all the user data for user RipplMaster (default user),
  // stops the spinner animation, and if there is an error displays an error message.
  getData() {
    console.log('getting DATA');
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/rippl/user/RipplMaster',
      dataType: 'json',
      success: function(data) {
        console.log('success! ', data);
        context.setState({list: data.reverse(), spinner: false, error: false});
      },
      error: function(err){
        context.setState({spinner: false, error: true});
        console.log(err);
        console.log('didnt work');
      }
    });
  }


  // Gets the data on mounting
  componentWillMount(){
    this.getData();
  }

  // Handles changes in the input tag
  handleChange(event) {
    this.setState({query: event.target.value});
    var context = this;
    console.log(context.state.query);
  }

  //handles search type change (radio button selection)
  handleSearchTypeChange(event) {
    this.setState({'queryType': event.target.value});
  }

  // This function gets tells the server to get the data for the a specified user,
  // starts the spinner animation, and if there is an error displays an error message.
  queryUser() {
    this.setState({spinner: true, error: false});
    console.log('querying USER')
    var context = this;
    var query = {
      handle: this.state.query
    };
    this.setState({query: ''});
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/analyzeUser',
      dataType: 'json',
      data: query,
      success: function(data){
        context.getData();
        console.log('queryUser succeeded')
        // console.log('success! ' + {data});
      },
      error: function(err){
        context.setState({spinner: false, error: true});
        console.log(err);
        console.log('queryUser failed');
      }
    });
  }

  queryTopic() {
    this.setState({spinner: true, error: false});
    console.log('queryTopic called')
    var context = this;
    var query = {
      topic: this.state.query
    };
    this.setState({query: ''});
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/analyzeTopic',
      dataType: 'json',
      data: query,
      success: function(data){
        context.getData();
        console.log('queryTopic succeeded');
      },
      error: function(err){
        context.setState({spinner: false, error: true});
        console.log(err);
        console.log('queryTopic failed');
      }
    });
  }

  render() {
    return(
      <div>
        <StatsNav 
          error={this.state.error} 
          spinner={this.state.spinner} 
          formVal={this.state.query} 
          getUserClick={this.queryUser} 
          formChange={this.handleChange}
          handleSearchTypeChange={this.handleSearchTypeChange}
        />
        <StatsBody list={this.state.list} />
        <StatsFoot />
      </div>
    );
  }
}
export default Stats;