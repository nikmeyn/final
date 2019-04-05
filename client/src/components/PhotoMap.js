import React from 'react';
import './EditPhotoDetails.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import haversine from 'haversine-distance';

class PhotoMap extends React.Component{
	 
	state = {
				showingInfoWindow: false,
				activeMarker: {}
	};
	
	componentDidMount() {
		this.props.getUserPosition()
		.then(response => {
		this.setState({userGeolocationObj: response});
		}).catch( err => {
		console.log("User Denied Location Request")});
	};
    
	render() {
		if (this.props.photos.length > 0 ) {
			const id = this.props.currentPhoto;
			const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/square-medium/`;
			let haversineRounded = -1; //flag
			const photo = this.props.photos.find(p => p.id === id);			
				if(this.state.userGeolocationObj){
					const userGeolocationLat = this.state.userGeolocationObj.coords.latitude;
					const userGeolocationLong = this.state.userGeolocationObj.coords.longitude;
					var userLoc = { latitude: userGeolocationLat, longitude: userGeolocationLong };
					var photoLoc = { latitude: photo.latitude, longitude: photo.longitude};
					//haversince returns distance in metres converting it to km
					const haversineKilometers = haversine(userLoc, photoLoc)/1000;
					haversineRounded = haversineKilometers.toFixed(2);
				}
				let haversineDiv = <div className='haversineSmallDiv'><p>Allow this website to access your location in order to calculate your distance from {photo.title} in a <strong>straight line</strong> (via haversnine equation) </p><h2> Unknown <strong>KM</strong></h2></div>;
				if(haversineRounded !== -1) // if it does not equal the inital flag include haversine div
				{
					haversineDiv = <div className='haversineSmallDiv'><p>Your distance from {photo.title} in a <strong>straight line</strong> (via haversnine equation) </p><h2> {haversineRounded} <strong>KM</strong></h2></div>;
				}
				return(
				 <article className="detailsMap">
				  <div className="detailsPhotoMapBox">
					<div className="photoThumbLeft">
						<div className="photoDivMap">
							<img src={imgURL+photo.path} alt={photo.title} />
							<h2>{photo.title}</h2>
							<h2>{photo.city},{photo.country}</h2>
							<button onClick={this.handleViewClick}>View</button>
							<button onClick={this.handleEditClick}>Edit</button>
						</div>
						{haversineDiv}
					</div>
					<div className="photoThumbRight">
					    <div className="mapDiv">
							<Map google={this.props.google}
							style={{width: '35em', height: '50%', position: 'relative'}}
							  	initialCenter={{lat: photo.latitude, lng: photo.longitude}}	
								center={{lat: photo.latitude, lng: photo.longitude}}	
								zoom={12}
								onClick={this.onMapClicked}>
								<Marker
								title={photo.title}
								name={photo.title}
								position={{lat: photo.latitude, lng: photo.longitude}}
								onClick={this.onMarkerClick}/>
								<InfoWindow
								marker={this.state.activeMarker}
								visible={this.state.showingInfoWindow}>
								<div>
									<h3>{photo.title}</h3>
								</div>
								</InfoWindow>
							</Map>
						</div>	
					</div>
				  </div>
				 </article>
				);
				}
				else{
				return null;
				}
		
	}
	
	handleEditClick = () => {
	this.props.changeToEditPhotoView();
	}
	
	handleViewClick = () => {
	this.props.changeToPhotoView();
	}
	
	onMarkerClick = (props, marker, e) =>
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
 
	onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
	};

}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyBC-wGOUq3xxkoWTDL79nSna_4JGfbyTIo')
})(PhotoMap)