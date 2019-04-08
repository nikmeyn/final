import React from "react";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import './TravelPhotos.css';


class PhotoThumb extends React.Component {
	render() {
		let editButton;
		let favButton;
	const imgURL = `https://storage.googleapis.com/web3-assignment2-photos/photos/large/${this.props.photo.filename}`;
	if (this.props.photo.user.userid === this.props.userID){
		editButton = <button className="editButton" onClick={this.handleEditClick} title="Edit"><span role="img" aria-label="Edit">✎</span></button>
		favButton = <button className="favButton" title="Fav" style={{backgroundColor: "#808080"}}><span role="img" aria-label="Fav">❤</span></button>
	}else{
		editButton = <button className="editButton" title="Edit" style={{backgroundColor: "#808080"}}><span role="img" aria-label="Edit">✎</span></button>
		favButton = <button className="favButton" onClick={this.handleFavoriteClick} title="Fav"><span role="img" aria-label="Fav">❤</span></button>

	}
		
	return (
	<div  className="photoBox" onClick={this.handleViewClick}>
		<figure>
			<img src={imgURL} className="photoThumb" title={this.props.photo.title} alt={this.props.photo.title} />
		</figure>
		<div>
			<button className="closeButton" onClick={this.handleDeleteClick}>X</button>
			<h3>{this.props.photo.title}</h3>
			<p>{this.props.photo.location.city}, {this.props.photo.location.country}</p>
			<button className="viewButton" onClick={this.handleViewClick} title="View"><span role="img" aria-label="View">👀</span></button>
			{favButton}
			<button className="mapButton" onClick={this.handleMapClick} title="Map"><span role="img" aria-label="Map">📍</span></button>
			{editButton}
		</div>			
	</div>);
	}
	
	handleEditClick = () => {
	this.props.changeToEditPhotoView();
	}
	
		
	handleMapClick = () => {
	this.props.changeToMapView();
	}
	
	handleViewClick = () => {
	this.props.showImageDetails(this.props.photo.id);
	}
	
	handleFavoriteClick = e => {
	this.props.updateFavorites(this.props.photo.id);
	}
	
	handleDeleteClick = () => {
	  confirmAlert({
      title: 'Delete ' + this.props.photo.title + '?',
      message: 'This photo will be forever lost and never retrieved. Please make sure you pick the right one!',
      buttons: [
        {
          label: 'Yes. Delete it!',
          onClick: () => this.props.deletePhoto(this.props.photo.id)
        },
        {
          label: 'No'
        }
      ]
    })
	}
	
	
}
export default PhotoThumb;	