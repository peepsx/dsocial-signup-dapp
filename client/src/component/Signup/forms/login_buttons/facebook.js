import React from 'react';
import Axios from 'axios';
import {API} from '../../../js/api_list'


export default class Facebook extends React.Component {
    constructor(props) {
        super(props);
        this.handleFbClick = this.handleFbClick.bind(this);
    }

    handleFbClick() {
        if (window.FB) {
            window.FB.login(function (response) {
                if (response.status === 'connected') {
                    console.log('response', response)
                    const userId = response.authResponse.userID.replace(/"/, ""), userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            console.log('fb user data', fbData);
                            this.handleSave(fbData);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    alert('User Login failed')
                }
            }, {
                return_scoper: true,
            });
        }

    }

    handleSave = (userData) => {
        console.log('user data', userData);
        if (userData && userData.data) {
            Axios({
                url: API.facebook_detail,
                method: 'POST',
                data: {
                    fbUserURL: "dummy url",
                    fbPhoto: userData.data.picture.data.url,
                    fbUserName: userData.data.name,
                    fbUserLocation: 'noida'
                }
            })
            .then(response => {
                console.log('Data save facebook', response);
            })
            .catch(err => {
                console.error('Error', err);
            })
        }
    }


    render() {
        console.log('props value', this.props)
        return (
            <button onClick={this.handleFbClick} type="button" className="btn btn-block btn-outline-light border py-4 h-100">
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}