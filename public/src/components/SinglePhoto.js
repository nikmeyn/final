import React from 'react';
import './EditPhotoDetails.css';

class SinglePhoto extends React.Component{
	render() {
		const id = this.props.currentPhoto;
		const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/medium/`;
				if (this.props.photos.length > 0 ) {
					const photo = this.props.photos.find(p => p.id === id);
				return(
				 <article className="details">
				  <div className="detailsPhotoBox">
					   <legend>Photo Details</legend>
					   <img src={imgURL+photo.path} alt={photo.title} />
					   
					   <h1>{photo.title}</h1>
					   
						<h2>{photo.city},{photo.country}</h2>
					   <h2>{photo.description}</h2>
					   
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