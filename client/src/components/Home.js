import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Home extends React.Component{
	render() {
		console.log("we are in home... showing usrObj..");
		let firstname;
		let city;
		if (this.props.userObj !== undefined){
			firstname = this.props.userObj.details.firstname;
			city = "from " + this.props.userObj.details.city;
		}
		return(
		<div className="banner">
			<Helmet>
			 <title>Home Page View</title>
			</Helmet>
		  <div className="splashPageDiv">
			<h3>Welcome <b><i>{firstname} {city}</i></b> where are we travelling today?</h3>
			<h2>“Travel makes one modest. You see what a tiny place you occupy in the world.” - Gustav Flaubert. </h2>
			<p>
				<Link to='/browse'>
				<button>Browse</button>
				</Link>
				<Link to='/about'>
				<button>About</button>
				</Link>
			</p>
			
		  </div>
		</div>
		);
	}
}
export default Home;