import React from 'react'
import './TravelPhotos.css';
import HeaderApp from './HeaderApp';
import {Helmet} from 'react-helmet';

class About extends React.Component {
    render() {
        return (
            <div className="aboutPage">
                <Helmet title="About"/>
                <HeaderApp pageTitle="About"/>
                <div className="aboutPageInfo">
                </div>
            </div>
        );
    }
}

export default About;