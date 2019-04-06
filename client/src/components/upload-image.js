import React, { Component } from 'react';
import './App.css';

class UploadImage extends Component {

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
        this.setState({
            uploadInProgress: true
        });

        var formData = new FormData();
        formData.append("avatar", file, file.name);

        let uploadedRes = await fetch('/', {
            method: 'POST',
            body: formData
        }).then(response => response.json())

        this.setState({
            uploadInProgress: false
        })

        return uploadedRes.path;

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

            xhr.open("POST", "http://157.230.57.197:9106/add");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);
        });
    }

    render() {
        return (
            <div class="container">
                <div class="featurette" id="about">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                                <div role="form">
                                    <h2>Upload a photo <small></small></h2>
                                    <hr class="colorgraph" />
                                    <div class="row">
                                        <div class="col-xs-12 col-md-6">

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

                                            <input type="button" value="Select Image" class="btn btn-primary btn-block btn-lg"
                                                   onClick = {
                                                       () => {
                                                           this.uploadProfile.click()
                                                       }
                                                   }/>
                                        </div>
                                        <div class="col-xs-12 col-md-6">
                                            <a class="btn btn-success btn-block btn-lg">Upload</a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                            <div class="form-group">
                                                <input type="text" name="title" id="title" class="form-control input-lg" placeholder="Title"
                                                       value = {
                                                           this.state.user.name
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'name')
                                                       }/>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                            <div class="form-group">
                                                <input type="text" name="description" id="description" class="form-control input-lg" placeholder="Description"
                                                       value = {
                                                           this.state.user.discription
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'discription')
                                                       }/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                            <div class="form-group">
                                                <input type="text" name="city" id="city" class="form-control input-lg" placeholder="City"
                                                       value = {
                                                           this.state.user.city
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'city')
                                                       }/>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                            <div class="form-group">
                                                <input type="text" name="country" id="country" class="form-control input-lg" placeholder="Country"
                                                       value = {
                                                           this.state.user.country
                                                       }
                                                       onChange = {
                                                           (event) => this.updatePropertyValue(event.target.value, 'country')
                                                       }/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-md-6 col-md-offset-3">
                                            <input type="button" class="btn btn-success btn-block btn-lg"
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



