import React from "react";
import './EditPhotoDetails.css';

class EditPhotoDetails extends React.Component {
	
	render() {
		const id = this.props.currentPhoto;
		const imgURL = `https://storage.googleapis.com/web3-assignment2-photos/photos/large/`;
		const apimethod = `api/images/${id}`;
				if (this.props.photos.length > 0 ) {
					const photo = this.props.photos.find(p => p.id === id);
				return(
				 <article className="details">
				  <div className="detailsPhotoBox">
					<form method={apimethod} className="photoForm">
					   <legend>Edit Photo Details</legend>
					   <img src={imgURL+photo.filename} alt={photo.title} />
					   
					   <label>Title</label>
					   <input type='text' name='title' value={photo.title}  onChange={this.handleChange} />

					   <label>ID</label>
					   <input type='text' name='id' value={photo.id}  onChange={this.handleChange} />
					      
					   <label>Description</label>
					   <input type='text' name='description' value={photo.description}  onChange={this.handleChange} />
						
					   <label>City</label>
					   <input type='text' name='city' value={photo.location.city} onChange={this.handleChange}/>
					   
					   <label>Country</label>
					   <input type='text' name='country' value={photo.location.country}  onChange={this.handleChange}/>
					   
					   <label>Longitude</label>
					   <input type='number' name='longitude' value={photo.location.longitude}  onChange={this.handleChange}/>
					   
					   <label>Latitude</label>
					   <input type='number' name='latitude' value={photo.location.latitude}  onChange={this.handleChange}/>
					   
					   <input type='hidden' name='_id' value={photo._id}/>
					   <input type='hidden' name='user' value={photo.user}/>
					   <input type='hidden' name='exif' value={photo.exif}/>
					   <input type='hidden' name='colors' value={photo.colors}/>
					   <input type='hidden' name='filename' value={photo.filename}/>


					   <input type='submit' value='Save Change Permantly'/>

					</form>
						<button onClick={this.handleViewClick}>View</button>
					   <button onClick={this.handleMapClick}>Map</button>
				  </div>
				 </article>
				);
				}
				else{
				return null;
				}
		
	}
	
	handleViewClick = () => {
		this.props.changeToPhotoView();
	}
	
		
	handleMapClick = () => {
	this.props.changeToMapView();
	}
	
	handleChange = e => {
		 const id = this.props.currentPhoto
		 const photo = this.props.photos.find( p => p.id === id);
		 const clonedPhoto = {...photo };
		 clonedPhoto[e.currentTarget.name] = e.currentTarget.value;
		 		 console.log(e.target);
		 console.log(photo);
		 		 console.log(clonedPhoto);
		 this.props.updatePhoto(this.props.currentPhoto, clonedPhoto);
	}
}

export default EditPhotoDetails;