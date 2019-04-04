import React from 'react';
import PhotoThumb from './PhotoThumb.js';
import './TravelPhotos.css';
class PhotoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {filterByCountry: false, 
					  filterByCity: false,
					  filterValue: ""};
	}

render(){	
		if(this.props.photos.length >= 1){

			//all values in both of these arrays are unique i am not sure why browser is complaining about distinct 'keys'
			let uniqueCities = [...new Set(this.props.photosDropdownData.map((p) =>  p.city ))];  //this line will give back a distinct list of cities
			uniqueCities.sort( (a, b) => { //short circuit if (if it meets conditions get out of function right away)
				if(a < b) { return -1; }
				if(a > b) { return 1; }
				return 0;
			})
			let uniqueCountries = [...new Set(this.props.photosDropdownData.map((p) =>  p.country ))]; //this code will give back a distinct list of country
			uniqueCountries.sort( (a, b) => { //short circuit if (if it meets conditions get out of function right away)
				if(a < b) { return -1; }
				if(a > b) { return 1; }
				return 0;
			})
			let filterButton = <div><button className="filterButton" onClick={this.handleCountryFilterClick}>Filter By Country</button> <button className="filterButton" onClick={this.handleCityFilterClick}>Filter By City</button></div>
			let filterPrompt;
			
			//having a dropdown gives the user less room for error. No bogus value will be passed in in terms of flow (http request not handled)
			if(this.state.filterByCountry){
				//filterPrompt = <div className="inputPrompt"><p>Filter Photos By Country:</p> <input type="text" name="countryFilter" onChange={this.handleFilter}/></div>
				filterPrompt = 	<div className="inputPrompt"><select name="countryFilter" onChange={this.handleFilter} size="1"><option key='-100' value='All'>Display All Countries</option> {uniqueCountries.map((photo,index) => <option key={index}  value={photo}>{photo}</option>)};</select></div>
				filterButton =  <div><button className="filterButton" onClick={this.handleCityFilterClick}>Filter By City</button></div> //if user is currently filtering by country give a button to let them filter by city
			}else if(this.state.filterByCity){ 
				//filterPrompt = <div className="inputPrompt"><p>Filter Photos By City:</p> <input type="text" name="cityFilter" onChange={this.handleFilter}/></div>
				filterPrompt = 	<div className="inputPrompt"><select name="cityFilter" onChange={this.handleFilter} size="1"><option key='-100' value='All'>Display All Cities</option> {uniqueCities.map((photo,index) => <option key={index} value={photo}>{photo}</option>)};</select></div>
				filterButton = <div><button className="filterButton" onClick={this.handleCountryFilterClick}>Filter By Country</button></div> //if user is currently filtering by city give a button to let them filter by country
			}
			
			return(
			<article className="photos">
				{filterButton}
				
				<form>
					{filterPrompt}
				</form>
					{
					this.props.photos.map( (p)=> <PhotoThumb 
					photo={p} 
					key={p.id} 
					showImageDetails={this.props.showImageDetails}
					updateFavorites={this.props.updateFavorites}
					deletePhoto={this.props.deletePhoto}
					changeToEditPhotoView={this.props.changeToEditPhotoView} 
					changeToMapView={this.props.changeToMapView}/> )
					}
			</article>
			);
		}	
		else
			return null;
}

handleFilter = (e) =>{
		if(e.target.name === 'countryFilter'){
			this.props.filterPhotos("country",e.target.value);
		}
		else{
			this.props.filterPhotos("city",e.target.value);
		}
		this.setState( {filterValue : e.target.value});
}


handleCountryFilterClick = () => {
		this.setState({ filterByCountry: true, filterByCity: false });
}
		
handleCityFilterClick = () => {
		this.setState({ filterByCity: true, filterByCountry: false });
}


}
 
export default PhotoList;