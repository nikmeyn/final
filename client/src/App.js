import React, {Component} from 'react';
import PhotoBrowser from './components/PhotoBrowser.js';
import * as cloneDeep from 'lodash/cloneDeep';
import {Route} from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login'; //login
import About from './components/About.js';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component {
    constructor(props) {
        super(props);

        //this if block takes care of favorite photos local storage for current session
        let favoritePhotosLocalStorage = localStorage.getItem('favoritePhotosLocalStorage');
        if (favoritePhotosLocalStorage !== null)
            favoritePhotosLocalStorage = JSON.parse(localStorage.getItem('favoritePhotosLocalStorage'));
        else
            favoritePhotosLocalStorage = [];
        this.state = {photos: [], favoritePhotos: favoritePhotosLocalStorage, photosAfterFilter: []};
        this.connecToServer = this.connecToServer.bind(this);
    }

    connecToServer() {
        fetch('/');
    }

    async componentDidMount() {
        try {
            //const url = "https://randyconnolly.com/funwebdev/services/travel/images.php";
            const url = "api/images";
            const response = await fetch(url);
            console.log("response=>" + response);
            const jsonData = await response.json();
            console.log("fetched data line 25 app.js \n" + jsonData);
            this.setState({photos: jsonData});
            document.title = "Assignment 2";
            this.connecToServer();
        } catch (error) {
            console.error(error);
        }

    }

    updatePhoto = (id, photo) => {
        const copyPhotos = cloneDeep(this.state.photos);
        const copyFavoritePhotos = cloneDeep(this.state.favoritePhotos);
        const photoToReplace = copyPhotos.find(p => p.id === id);
        const photoToReplaceFavorites = copyFavoritePhotos.find(p => p.id === id);

        //if photo being updated also in favorites also update the title of the favorites since it is being used in alt property
        if (photoToReplaceFavorites !== undefined) {
            photoToReplaceFavorites.title = photo.title;
        }

        photoToReplace.title = photo.title;
        photoToReplace.city = photo.location.city;
        photoToReplace.country = photo.location.country;
        photoToReplace.description = photo.description;
        photoToReplace.latitude = photo.location.latitude;
        photoToReplace.longitude = photo.location.longitude;

        this.setState({
            photos: copyPhotos,
            favoritePhotos: copyFavoritePhotos
        });
    }

    updateFavorites = (id) => {
        const favoritePhotosClone = cloneDeep(this.state.favoritePhotos);
        //fp stands for favorite photo: check if photo already in favoritePhotos array
        const existingPhotoInFavorites = favoritePhotosClone.find(fp => fp.id === id);
        if (existingPhotoInFavorites == null) {
            const photoToPush = this.state.photos.find(p => p.id === id);
            favoritePhotosClone.push(photoToPush);
            this.setState({favoritePhotos: favoritePhotosClone});
            this.notifySuccess('Image added to Favorites');
            //we will store the clone since setState is an asynchronous request and might not hold the most updated value
            localStorage.setItem('favoritePhotosLocalStorage', JSON.stringify(favoritePhotosClone));
            localStorage.setItem('favoritePhotosTimeStamp', Date.now());
        } else {
            this.notifyError();
        }
    }
    //deletes photo from both photos and favorites
    deletePhoto = (id) => {
        let copyPhotos = cloneDeep(this.state.photos);
        let copyFilterPhotos = cloneDeep(this.state.photosAfterFilter); //if the photo to be deleted is still in the filtered list delete that too
        copyFilterPhotos = copyFilterPhotos.filter(p => p.id !== id);
        copyPhotos = copyPhotos.filter(p => p.id !== id);
        this.deletePhotoFromFavorites(id); //also delete photo in favorites if it exists
        this.setState({
            photos: copyPhotos,
            photosAfterFilter: copyFilterPhotos
        });
        this.notifySuccess('Image deleted');
    }

    deletePhotoFromFavorites = (id) => {
        let copyFavoritePhotos = cloneDeep(this.state.favoritePhotos);
        copyFavoritePhotos = copyFavoritePhotos.filter(p => p.id !== id);
        this.setState({favoritePhotos: copyFavoritePhotos});
        localStorage.setItem('favoritePhotosLocalStorage', JSON.stringify(copyFavoritePhotos)); //we will store the clone since setState is an asynchronous request and might not hold the most updated value
        localStorage.setItem('favoritePhotosTimeStamp', Date.now());
    }

    notifySuccess = (text) => {
        Alert.success(text, {
            position: 'bottom-left',
            effect: 'slide',
            timeout: 5000
        });
    }

    notifyError = () => {
        Alert.error('Image already in Favorites!', {
            position: 'bottom-left',
            effect: 'slide',
            timeout: 5000
        });
    }

    //since template literals are not avaialble in jsx
    //this if block would be better than having seperate event handlers for the filters
    filterPhotos = (criteria, text) => {
        console.log("criteria =" + criteria + " text: " + text);
        let filteredPhotos = [];
        if (text !== "All") {
            if (criteria === "country") {
                filteredPhotos = this.state.photos.filter((photo) => photo.location.country.toLowerCase() === text.toLowerCase());
            } else {
                filteredPhotos = this.state.photos.filter((photo) => photo.location.city.toLowerCase() === text.toLowerCase());
            }
        } else {
            filteredPhotos = [];
        }
        this.setState({photosAfterFilter: filteredPhotos});
    }

    clearPhotosAfterFilter = () => {
        this.setState({photosAfterFilter: []});
        console.log("photosAfterFilter cleared");
    }


    render() {
        let photoDisplayList = cloneDeep(this.state.photos);
        if (this.state.photosAfterFilter.length !== 0) {
            photoDisplayList = cloneDeep(this.state.photosAfterFilter);
        }
        return (
            <div>
                <Route path='/' exact component={Login}/>
                <Route path='/home' exact component={Home}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/browse' exact
                       render={(props) =>
                           <PhotoBrowser
                               photos={photoDisplayList}
                               photosDropdownData={this.state.photos}
                               updatePhoto={this.updatePhoto}
                               updateFavorites={this.updateFavorites}
                               favoritePhotos={this.state.favoritePhotos}
                               filterPhotos={this.filterPhotos}
                               deletePhoto={this.deletePhoto}
                               deletePhotoFromFavorites={this.deletePhotoFromFavorites}
                               clearPhotosAfterFilter={this.clearPhotosAfterFilter}/>}
                />
                <Route path='/about' exact component={About}/>
                <Alert stack={{limit: 1}}/>
            </div>
        );
    }

}

export default App;
