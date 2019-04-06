import React from 'react';
import './EditPhotoDetails.css';

class SinglePhoto extends React.Component{
	render() {
		const id = this.props.currentPhoto;
		const imgURL = `https://storage.googleapis.com/web3-assignment2-photos/photos/large/`;
		if (this.props.photos.length > 0 ) {
			const photo = this.props.photos.find(p => p.id === id);
			return(
				<article className="details">
					<div className="detailsPhotoBox">
						<legend>Photo Details</legend>
							<img src={imgURL+photo.filename} alt={photo.title} />
						
							<h1>{photo.title}</h1>
						
							<h2>{photo.location.city},{photo.location.country}</h2>
							<h2>{photo.description}</h2>

							<h2>Taken By: {photo.user.firstname} {photo.user.lastname}</h2>
							
							{/* add check if user logged in current user */}
							<h2>EXIF</h2>
							<h2>make: {photo.exif.make}</h2>
							<h2>model: {photo.exif.model}</h2>
							<h2>exposure: {photo.exif.exposure_time}</h2>
							<h2>aperture: {photo.exif.aperture}</h2>
							<h2>focal_length: {photo.exif.focal_length}</h2>
							<h2>iso: {photo.exif.iso}</h2>

							<button onClick={this.handleEditClick}>Edit</button>
							<button onClick={this.handleMapClick}>Map</button>


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
	
	
	handleMapClick = () => {
	this.props.changeToMapView();
	}
	
}



export default SinglePhoto;