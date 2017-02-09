import { Footer } from 'react-materialize';

// This component represents the footer of the page
class StatsFoot extends React.Component{
  constructor(props){
  	super(props);
  }

  handleClick() {
    window.localStorage.removeItem('id_token');
  }

  render(){
  	return(
  	  <Footer
        moreLinks={
          <a onClick={this.handleClick()} className="grey-text text-lighten-4 right" href="/">Logout</a>
        }
        links={
          <ul>
          </ul>
        }
        className='example'>
      </Footer>
  	);
  }
}

export default StatsFoot;