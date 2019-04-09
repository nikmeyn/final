import React from 'react'
import './TravelPhotos.css';
import HeaderApp from './HeaderApp';
import {Helmet} from 'react-helmet';

class About extends React.Component{
	render()
	{
		return(
			<div className="aboutPage">
				<Helmet title="About" />
				<HeaderApp pageTitle="About"/>
				
				<div className="aboutPageInfo">
				<p> This website is created by Gio Moros, James Stewart, John Hernandez, and Nik Meyn for our  COMP 4513 class<br></br>
				Some of the major modules used in developing this website were:</p>
				<ul>
				<li><a href="https://www.npmjs.com/package/helmet"> Helmet </a></li>
				<li><a href="https://www.npmjs.com/package/glyphicons"> Glyphicons </a></li>
				<li><a href="https://www.npmjs.com/package/haversine-distance"> Haversine Distance </a></li>
				<li><a href="https://www.npmjs.com/package/react-confirm-alert"> Confirm Alert </a></li>
				<li><a href="https://www.npmjs.com/package/file-saver"> File Saver </a></li>
				<li><a href="https://stuk.github.io/jszip/"> Jszip </a></li>
				<li><a href="http://react-s-alert.jsdemo.be/"> react-s-alert </a></li>
                <li><a href="https://www.npmjs.com/package/bcryptjs"> BCrypt </a></li>
                <li><a href="https://www.npmjs.com/package/multer">Multer</a></li>
                <li><a href="https://www.npmjs.com/package/passport">Passport</a></li>
                <li><a href="https://www.npmjs.com/package/lodash">lodash</a></li>
				</ul>
				
				<p>The images on this website were retrieve from: <br></br></p>
				<ul>
				<li><a href="https://favicon.io/emoji-favicons/airplane-departure/"> Airplane Favicon </a></li>
				<li><a href="https://unsplash.com/photos/6U4wogjLArk"> Home Wallpaper </a></li>
				<li><a href="https://source.unsplash.com/6U4wogjLArk/3840x5760">About Wallpaper </a></li>
				</ul>
				
				<p>Fonts used on this website were:<br></br></p>
				<ul>
				<li><a href="https://fonts.googleapis.com/css?family=Sonsie+One"> Sonsie One</a></li>
				<li><a href="https://fonts.googleapis.com/css?family=Pacifico"> Lato </a></li>
				<li><a href="https://fonts.googleapis.com/css?family=Lato"> Pacifico </a></li>
				</ul>
				<p>API Test Links:</p><br></br>
				<p>https://safe-crag-81509.herokuapp.com/api/images/3a5c5da5-5a12-4d2b-b0dd-abc28eaf810b</p>
				<p>Link to all images: https://safe-crag-81509.herokuapp.com/api/af8aac94319213bbf22cf890670500f3/images</p>
				<p>Link to single image: https://safe-crag-81509.herokuapp.com/api/images/3a5c5da5-5a12-4d2b-b0dd-abc28eaf810b </p>
					
				
                    <p>The Web Development Wisdom bestowed upon me is written in this <a href="http://funwebdev.com/"> book</a> and the Web Dev Guru himself, Randy Connolly.<br></br><br></br>
                    Unfortunately, there are 3 <strong>bugs</strong> on this website:</p>
                    <p>
                        <strong> 1) State does not reload after upload</strong> - After uploading an image, the state does not reload automatically. This means that a new upload will not show on the list of photos until you refresh the page. <br></br>
                        <strong> 2) Zip file download button</strong> - Browser complains about Cross-Origin Resource Sharing when downloading the jpg from a remote source<br></br>
                        <strong>3) Editing a photo after filtering</strong> - The user is able to edit photos when the PhotoList is showing all photos, but not the after filter. The Bug showed up after making the filter a dropdown instead of a text filter.<br></br>
                        (I have a hunch that it is the asynchronous setState call)<br></br>
                        <strong>4) Favorites Toggle </strong> - After Initial Render viewer needs to double click Favorite Show/Hide Toggle(I believe first click mounts the event handler and the second click executes the code)
                    </p>
				</div>
			</div>
		);
	}	
}

export default About;