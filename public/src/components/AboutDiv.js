import React from 'react';
import Glyphicon from 'glyphicons';
import './TravelPhotos.css';
const AboutDiv = function(props){
return(
<div className="aboutDiv">
<span className="glyphicon">{Glyphicon.books}</span>
<h2>Node Modules</h2>
<p><a href="https://www.npmjs.com/package/helmet"> Helmet </a></p>
<p><a href="https://www.npmjs.com/package/glyphicons"> Glyphicons </a></p>
</div>
);
}
 
export default AboutDiv;