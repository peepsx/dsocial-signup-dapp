import React from 'react';
import Axios from 'axios';

import { API } from '../../../js/api_list';
import { toast } from 'react-toastify';

class Facebook extends React.Component {
    handleFbClick = () => {
        this.props.handleNextShowBtn('fs')
        if (window.FB) {
            window.FB.login((response) => {
                if (response.status === 'connected') {
                    const userId = response.authResponse.userID.replace(/"/, ""),
                        userAccessToken = response.authResponse.accessToken.replace(/"/, "");
                    Axios({
                        method: 'GET',
                        url: `https://graph.facebook.com/v3.3/${userId}?fields=id,name,likes,picture{url}&access_token=${userAccessToken}`
                    })
                        .then((fbData) => {
                            this.handleFbDataSave(fbData,userAccessToken);
                        })
                        .catch(err => {
                            console.error('Error', err);
                        })
                } else {
                    toast("Facebook login failed", {
                        type: 'warning',
                        autoClose: 3000,
                    })
                }
            }, {
                scope: 'email,user_likes',
                return_scoper: true,
            });
        }
    }

    handleFbDataSave = (userData,accessToken) => {
        console.log('inside fb', userData);
        if (userData && userData.data) {
            localStorage.setItem('fbUserId', userData.data.id);
            Axios({
                url: API.facebook_detail,
                method: 'POST',
                data: {
                    id: userData.data.id,
                    access_token: accessToken,
                    fbPhoto: userData.data.picture.data.url,
                    fbUserName: userData.data.name,
                },
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
                .then(response => {
                    console.log('Data save facebook', response);
                    localStorage.setItem('token',response.data.token)
                    toast(response.data.message, {
                        type: 'success',
                        autoClose: 3000,
                        onClose: this.props.handleNextShowBtn('fs')
                    })
                })
                .catch(err => {
                    console.error(err);
                    if (err.message.includes('status code 403')) {
                        toast("User already registered", {
                            type: 'warning',
                            autoClose: 3000,
                            onClose: this.props.handleNextShowBtn('fs')
                        })
                    }
                })
        }
    }

    render() {
        return (
            <button
                id="fbLoginBtn"
                onClick={this.handleFbClick}
                type="button"
                className="btn btn-block btn-outline-light border py-4 h-100"
                // disabled={!(this.props.nextBtnStatus === '')}
            >
                <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                <span className="h6 mb-0 d-block">Facebook</span>
            </button>
        )
    }
}

export default Facebook;