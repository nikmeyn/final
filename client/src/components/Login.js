import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.isChecked = false
        this.state = {
            uploadInProgress: false,
            user: {},
        };
    }

    updatePropertyValue(val, prop) {
        let usr = this.state.user || {};
        usr[prop] = val;
        this.setState({ user: usr });
    }

    async executeAPI() {
        return new Promise((resolve, reject) =>{
            var data = JSON.stringify({
                "username": this.state.user.email,
                "password": this.state.user.password
            });

            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    resolve(this.responseText)
                }
            });

            xhr.open("POST", "http://localhost:8080/login");//need to replace with base url from some config
            xhr.setRequestHeader("content-type", "application/json");

            xhr.send(data);
        })
    }
    async login() {
        console.log(this.state)

        if (this.state.user.email && this.state.user.email != '' && this.state.user.password && this.state.user.password != '') {


            if (this.isChecked == true) {
                localStorage.setItem('user', JSON.stringify({ email: this.state.user.email, password: this.state.user.password}))
            }

            let response = await this.executeAPI();
            
            var userdata = JSON.parse(response)
            if (userdata.success == true && userdata.token) {
                localStorage.setItem('token', userdata.token)
                //browserHistory.push('/home');
                //this.props.history.push('/home')
                window.location.href = '/browse'
            } else {
                alert(userdata.message)
            }
        } else {
            alert('Please enter the username or password')
        }
    }

    getCheckbox(data) {
        this.isChecked = data.currentTarget.checked
    }

	render() {
		return(
		<div className="bannerLogin">
			<Helmet>
			 <title>Login</title>
			</Helmet>
            <div className="loginDiv">
                    <form>
                    <h1>Welcome</h1>

                    <div className="col-3">
                            <input className="effect-2" type="email" placeholder="Email"
                                value={
                                    this.state.user.email
                                }
                                onChange={
                                    (event) => this.updatePropertyValue(event.target.value, 'email')
                                }/>
                    <span className="focus-border"></span>
                    </div>
                    <br></br>
                    <div className="col-3">
                            <input className="effect-2" type="password" placeholder="Password"
                                value={this.state.user.password}
                                onChange={
                                    (event) => this.updatePropertyValue(event.target.value, 'password')
                                }/>
                    <span className="focus-border"></span>
                    </div>
                    <input type="checkbox" onChange={this.getCheckbox.bind(this)} name="vehicle1" value="Bike"/>Remember me
                    <input type="button" onClick={this.login.bind(this)} className="loginButton" value="Login" />
                    
                </form>
            </div>
		</div>
		);
    }


}
export default Home;