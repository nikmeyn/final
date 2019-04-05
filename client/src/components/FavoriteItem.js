import React from 'react';
import './TravelPhotos.css';
class FavoriteItem extends React.Component{
	render(){
		const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/square-medium/${this.props.photo.path}`;
		return(
		<figure className="favItem"> 
		<button className="closeButton" onClick={this.handleDeleteClick}>X</button>
		<img src={imgURL} className="photoThumb" title={this.props.photo.title} alt={this.props.photo.title} />
		</figure>
		);
		
	}
	
	handleDeleteClick = (e) => {
		this.props.deletePhotoFromFavorites(this.props.photo.id);
	}
	
}

export default FavoriteItem;