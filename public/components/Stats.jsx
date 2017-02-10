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
      // location: '33.517269,-86.808293,10km',
      queryType: 'twitterHandle', //twitterHandle, topic, or location
      location: undefined,
      list: [],
      spinner: false
    }

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    this.queryUser = this.queryUser.bind(this);
    this.handleQueryType = this.handleQueryType.bind(this);
    this.queryTopic = this.queryTopic.bind(this);
    this.queryLocation = this.queryLocation.bind(this);
  }


  // This function gets all the user data for user RipplMaster (default user),
  // stops the spinner animation, and if there is an error displays an error message.
  getData() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/rippl/user/RipplMaster',
      dataType: 'json',
      success: function(data) {
        console.log('success!');
        context.setState({list: data.reverse(), spinner: false, error: false});
      },
      error: function(err){
        context.setState({spinner: false, error: true});
        console.log(err);
      }
    });
  }


  // Gets persisted data in storage on mounting
  componentWillMount(){
    this.getData();
  }

  // Handles changes in the input tag
  handleChange(event) {
    this.setState({query: event.target.value});
    var context = this;
  }

  //handles search type change (radio button selection)
  handleSearchTypeChange(event) {
    this.setState({'queryType': event.target.value});
  }


  // Acts as a switch for which query type to call based on the `queryType` state variable
  handleQueryType() {
    if (this.state.queryType === 'twitterHandle') {
      this.queryUser();
    } else if (this.state.queryType === 'topic') {
      this.queryTopic();
    } else {
      this.queryLocation();
    }
  }

  // Ajax request to the server to get the data for the specified TWITTERHANDLE,
  // Also starts the spinner animation, and if there is an error, displays an error message.
  queryUser() {
    this.setState({spinner: true, error: false});
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
      },
      error: function(err){
        context.setState({spinner: false, error: true});
        console.log(err);
      }
    });
  }

  // Ajax request to the server to get the data for the specified TOPIC,
  // Also starts the spinner animation, and if there is an error, displays an error message.
  queryTopic() {
    this.setState({spinner: true, error: false});
    var context = this;
    var query = {
      topic: this.state.query,
      location: this.state.location
    };
    this.setState({query: ''});
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/analyzeTopic',
      dataType: 'json',
      data: query,
      success: function(data){
        context.getData();
      },
      error: function(err){
        context.setState({spinner: false, error: true});
        console.log(err);
      }
    });
  }

  // Ajax request to the server to get the data for the specificed LOCATION,
  // Also starts the spinner animation, and if there is an error, displays an error message.
  queryLocation() {

  }

  render() {
    return(
      <div>
        <StatsNav 
          error={this.state.error} 
          spinner={this.state.spinner} 
          formVal={this.state.query} 
          getUserClick={this.handleQueryType} 
          formChange={this.handleChange}
          handleSearchTypeChange={this.handleSearchTypeChange}
        />
        <StatsBody 
          list={this.state.list}
        />
        <StatsFoot />
      </div>
    );
  }
}
export default Stats;