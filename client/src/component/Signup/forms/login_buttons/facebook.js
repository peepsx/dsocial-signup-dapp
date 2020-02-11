import React from 'react';
import Axios from 'axios';

import {API} from '../../../js/api_list';
import { env } from '../../../config/config';

let IsMount = false;

class Facebook extends React.Component {
    componentDidMount() {
            window.FB.init({
            appId: env.facebook_client_id,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v3.3'
        });
        IsMount = true;
    }

    handleFbClick = () => {
        if (window.FB && IsMount) {
            window.FB.login((response) => {
                if (response.status === 'connected') {
                    const userId = response.authResponse.userID.replace(/"/, ""),
                        userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        // url: `https://graph.facebook.com/v5.0/${userId}?fields=name,email,link,picture,location{location{city,state,country}}&access_token=${userAccessToken}`
                        url:`https://graph.facebook.com/v3.3/${userId}?fields=id,name,location,link,picture{url}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            this.handleFbDataSave(fbData);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    alert('User Login failed')
                }
            }, {
                scope:'user_link,user_location',
                return_scoper: true,
            });
        }

    }

    handleFbDataSave = (userData) => {
        if (userData && userData.data) {
            console.log('inside fb', userData.data && userData.data);
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
        return (
            <button onClick={this.handleFbClick} type="button" className="btn btn-block btn-outline-light border py-4 h-100">
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}

export default Facebook;