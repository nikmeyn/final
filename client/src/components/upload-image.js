import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
        debugger;
        let fieldsall = this.allvaluefield();
        if (!fieldsall) {
            alert("Fill All required details");
            return;
        }
        let uploaded = await this.createImageFinal(this.state.user);
        alert(uploaded ? "Add successful" : "Error in uploading");
    }


    async createImageFinal(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "title": user.name,
                "description": user.discription,
                "city": user.city,
                "country": user.country,
                "image": user.image
                //add extra fields
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
            xhr.send(data);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="featurette" id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                                <div role="form">
                                    <h2>Upload a photo <small></small></h2>
                                    <hr className="colorgraph" />
                                    <div className="row">
                                        <div className="col-xs-12 col-md-6">

                                            <input id = "myInputProfile"  type = "file"  ref = {
                                                (ref) => this.uploadProfile = ref
                                            }
                                                   style = {
                                                       {
                                                           display: 'none'
                                                       }
                                                   }
                                                   onChange = {
                                                       this.onChangeFileProfile.bind(this)
                                                   }
                                            />

                                            <input type="button" value="Select Image" className="btn btn-primary btn-block btn-lg"
                                                   onClick = {
                                                       () => {
                                                           this.uploadProfile.click()
                                                       }
                                                   }/>
                                        </div>
                                        <div className="col-xs-12 col-md-6">
                                            <a className="btn btn-success btn-block btn-lg">Upload</a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="title" id="title" className="form-control input-lg" placeholder="Title"
                                                       value = {
                                                           this.state.user.name
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'name')
                                                       }/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="description" id="description" className="form-control input-lg" placeholder="Description"
                                                       value = {
                                                           this.state.user.discription
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'discription')
                                                       }/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="city" id="city" className="form-control input-lg" placeholder="City"
                                                       value = {
                                                           this.state.user.city
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'city')
                                                       }/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="country" id="country" className="form-control input-lg" placeholder="Country"
                                                       value = {
                                                           this.state.user.country
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'country')
                                                       }/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-md-6 col-md-offset-3">
                                            <input type="button" className="btn btn-success btn-block btn-lg"
                                                   onClick = {
                                                       this.createNewImage.bind(this)
                                                   } value="Add New Image" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadImage;



