import React from 'react';
import './Favorites.css';
import FavoriteItem from './FavoriteItem';
import jszip from 'jszip';
import jszipUtils from 'jszip-utils';
import FileSaver from 'file-saver';
class Favorites extends React.Component{
	
  constructor(props) {
    super(props);
    this.favoritesCollapsible = React.createRef();
	this.toggleCollapsible = this.toggleCollapsible.bind(this);
  }
  
 render()
 {
	if(this.props.favoritePhotos.length > 0){
	 return(
	 <div>
	 	<div className='collapsible' onClick={this.toggleCollapsible}>
			<h3>❤ Click here to Hide Favorites</h3>
		</div>
		<div className='favorites' ref={this.favoritesCollapsible}>
			<div className='favoriteList'>
				{ this.props.favoritePhotos.map((p)=> <FavoriteItem 
				photo={p} 
				key={p.id} 
				deletePhotoFromFavorites={this.props.deletePhotoFromFavorites}/> )}
			</div>
			<div className='favoriteButtonDiv'>
				<button onClick={this.downloadZip}>Download</button>
			</div>
		</div>
	</div>
	 );
	}
	else{
		return null;
	}
 }


//not sure why this button needs to be clicked twice? 
//first click binds the function to the onclick event 
//the second executes the code
 toggleCollapsible = e => {
	 console.log(this.favoritesCollapsible.current.style.display);
	 if(this.favoritesCollapsible.current.style.display === 'flex') {
      this.favoritesCollapsible.current.style.display = 'none';
	  e.target.innerText = "❤ Show Favorites";
    } else {
      this.favoritesCollapsible.current.style.display = 'flex';
	  e.target.innerText = "❤ Click Again to Hide Favorites";
    }
 }
 
 downloadZip = () => {
var zip = new jszip();
const imgPath = `https://storage.googleapis.com/funwebdev-3rd-travel/large/`;
jszipUtils.getBinaryContent(imgPath + '6592902825.jpg', function (err, data) {
   if(err) {
	   console.log("error!!!");
   }
   else{
   zip.file("6592902825.jpg", data, {base64: true});
   }
});

//zip.file('https://storage.googleapis.com/funwebdev-3rd-travel/large/6592902825.jpg' ,Image, {base64: true});


zip.generateAsync({type:"blob"})
.then(function(content) {
    FileSaver(content, "Travel Photos - Favorites.zip");
});
	}
}

export default Favorites;