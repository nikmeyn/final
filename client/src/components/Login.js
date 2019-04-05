import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Home extends React.Component{
	render() {
		return(
		<div className="bannerLogin">
			<Helmet>
			 <title>Login</title>
			</Helmet>
            <div className="loginDiv">
                <form action='Home'>
                    <h1>Welcome</h1>

                    <div className="col-3">
                       <input className="effect-2" type="email" placeholder="Email"/>
                    <span className="focus-border"></span>
                    </div>
                    <br></br>
                    <div className="col-3">
                       <input className="effect-2" type="password" placeholder="Password"/>
                    <span className="focus-border"></span>
                    </div>

                    <button type="submit" className="submitBtn">Login</button>
                    
                </form>
            </div>
		</div>
		);
	}
}
export default Home;