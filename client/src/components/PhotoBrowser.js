import React from "react";
import PhotoList from './PhotoList.js';
import EditPhotoDetails from './EditPhotoDetails.js';
import { Helmet } from 'react-helmet';
import HeaderApp from './HeaderApp.js';
import Favorites from './Favorites.js';
import SinglePhoto from './SinglePhoto.js';
import PhotoMap from './PhotoMap.js';
import './TravelPhotos.css';

class PhotoBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {currentPhoto: 1,
					  viewSinglePhoto: true,
					  viewEditPhoto: false,
					  viewMap: false};
	}

static getDerivedStateFromProps(nextProps, prevState){
	if(nextProps.photos.length > 0){
			if(nextProps.photos.filter( (p) => p.id === prevState.currentPhoto).length === 0){
				const nextPhotoID = nextProps.photos[0];
				if(nextPhotoID !== null)
					return { currentPhoto: nextPhotoID.id};
			}
	}
		return null;
}

render(){		
			let photoDetails;
			if(this.state.viewSinglePhoto)
				photoDetails = <SinglePhoto photos={this.props.photos} currentPhoto={this.state.currentPhoto} changeToEditPhotoView={this.changeToEditPhotoView} changeToMapView={this.changeToMapView}/>
			else if(this.state.viewEditPhoto){
				photoDetails = <EditPhotoDetails photos={this.props.photos} currentPhoto={this.state.currentPhoto} updatePhoto={this.props.updatePhoto} changeToPhotoView={this.changeToPhotoView} changeToMapView={this.changeToMapView}/>
			}else if(this.state.viewMap)
				photoDetails = <PhotoMap getUserPosition={this.getUserPosition} photos={this.props.photos} currentPhoto={this.state.currentPhoto} changeToPhotoView={this.changeToPhotoView} changeToEditPhotoView={this.changeToEditPhotoView}/>
	return(
	<div>
	<HeaderApp pageTitle="Browse" />
	<Favorites favoritePhotos={this.props.favoritePhotos}
				deletePhotoFromFavorites={this.props.deletePhotoFromFavorites}/>
	<section className="container">
	<Helmet title="Browse" />		
		<PhotoList photos={this.props.photos}
				   photosDropdownData={this.props.photosDropdownData}
				   showImageDetails={this.showImageDetails}
				   updateFavorites={this.props.updateFavorites}
				   filterPhotos={this.props.filterPhotos}
				   deletePhoto={this.props.deletePhoto}
				   clearPhotosAfterFilter={this.props.clearPhotosAfterFilter}
				   changeToEditPhotoView={this.changeToEditPhotoView} 
				   changeToMapView={this.changeToMapView}/>
		{photoDetails}
	</section>
	</div>
	);
}

getUserPosition = () => {
    return new Promise((res, rej) => {navigator.geolocation.getCurrentPosition(res, rej);});
}

changeToEditPhotoView = () => {
	this.setState( {viewSinglePhoto : false, viewEditPhoto: true, viewMap: false});
}

changeToPhotoView = () =>{
	this.setState( {viewSinglePhoto : true, viewEditPhoto: false, viewMap: false});
}

changeToMapView = () =>{
	this.setState( {viewSinglePhoto : false, viewEditPhoto: false, viewMap: true});
}

showImageDetails = (id) => {
	this.setState({ currentPhoto: id });
}
}

export default PhotoBrowser;