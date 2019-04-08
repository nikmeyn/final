import React from 'react';
import '../App.css';
import './upload.css';
import HeaderApp from './HeaderApp.js';
import { Helmet } from 'react-helmet';
const randomStr = require("randomstring");

class UploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadInProgress: false,
            user: {  },
        };
    }

    updatePropertyValue(val, prop) {
        let usr = this.state.user || {};
        usr[prop] = val;
        this.setState({      user: usr    });
    }

    async onChangeFileProfile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        const url = await this.uploadFile(file);
        var usr = this.state.user || {};
        usr.image = url;
        usr.fileName = file;
        this.setState({user: usr });
        console.log(this.state);
    }

    async  uploadFile(file) {
        return new Promise((resolve, reject) => {
            const apiUrl = 'http://localhost:8080/profile';
            this.setState({
                uploadInProgress: true
            });

            var formData = new FormData();
            formData.append("avatar", file, file.name);

            //let uploadedRes = await fetch('/', {
            //    method: 'POST',
            //    body: formData
            //}).then(response => response.json())

            //this.setState({
            //    uploadInProgress: false
            //})

            //return uploadedRes.path;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", apiUrl, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText).path);
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };

            xhr.send(formData);
        })
    }



    allvaluefield() {
        let usr = this.state.user;
        if (usr && usr.image && usr.name && usr.discription && usr.city && usr.country)
            return true;
        else
            return false;
    }


    async createNewImage() {
        let fieldsall = this.allvaluefield();
        if (!fieldsall) {
            alert("Fill All required details");
            return;
        }
        let uploaded = await this.createImageFinal(this.state.user);
        alert(uploaded ? "Add Image successful" : "Error in uploading");
    }


    async createImageFinal(user) {
        const imageData = user;
        const randomID = randomStr.generate({
            length: 12,
            charset: 'alphabetic'
          });
        console.log(imageData);
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ //_id is automatically added
                "id": randomID, //random id
                "title": imageData.name,
                "description": imageData.discription,
                'location': {'iso': "Upload", 
                "city": imageData.city,
                "country": imageData.country,
                'cityCode': 0, 
                'continent': "Upload", 
                'latitude': 0, 
                'longitude': 0},  
                'user': {'userid': this.props.userObj.id, 
                'picture': {'large': imageData.large, 
                'thumbnail': imageData.thumb}, 
                'firstname': this.props.userObj.firstname, 
                'lastname': this.props.userObj.lastname},	
                'exif':{'make': "SONY", 
                'model': "ILCE-7M3", 
                'exposure_time': "1/100", 
                'aperture': "4.81", 
                'focal_length': "28", 
                'iso': 2500},
                'filename':  imageData.fileName.name,
                'colors':[{'hex': "black", 'name': "black"}, 
                {'hex': "black", 'name': "black"}, 
                {'hex': "black", 'name': "black"}, 
                {'hex': "black", 'name': "black"}, 
                {'hex': "black", 'name': "black"} ] 
            });

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            };

            xhr.open("POST", "http://localhost:8080/add");
            xhr.setRequestHeader("content-type", "application/json");
            console.log("upload data");
            console.log(data);
            xhr.send(data);
        });
    }

    render() {
        return (
    <div>
        <HeaderApp pageTitle="Upload an Image!" />
        <Helmet title="Upload Image" />	
            <div className="uploadPage">
            <article className="details">
                    <input id = "myInputProfile"  type = "file"  ref = {(ref) => this.uploadProfile = ref}style = {{display: 'none'}}onChange = {this.onChangeFileProfile.bind(this)}/>
                    <input type="button" className="cloudButton" value="Select Image" onClick = {() => {this.uploadProfile.click()}}/>
                        <div className="detailsPhotoBox">
                        <label>Title </label>
                        <input type="text" name="title" id="title" value = {this.state.user.name} onChange = {(event) => this.updatePropertyValue(event.target.value, 'name')}/>
                        <label>Description </label>
                        <input type="text" name="description" id="description"value = {this.state.user.discription} onChange = {(event) => this.updatePropertyValue(event.target.value, 'discription')}/>
                        <label>City </label>
                        <input type="text" name="city" id="city"  pvalue = {this.state.user.city}onChange = {(event) => this.updatePropertyValue(event.target.value, 'city')}/>    
                        <label>Country </label>
                        <input type="text" name="country" id="country" value = {this.state.user.country } onChange = {(event) => this.updatePropertyValue(event.target.value, 'country')}/>                  
                        </div>
                    <input type="button" className="cloudButton" onClick = {this.createNewImage.bind(this)} value="Upload Into the Clouds!" />
            </article> 
            </div>
    </div>
        );
    }
}

export default UploadImage;



