import React from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';

import { API } from '../../js/api_list';
import { env } from '../../config/config';
import Loader from 'react-loader-spinner';
import gold from '../../assets/img/gold_img.png'

export default class Third extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fbPostResponse: '',
            loading: false,
            facebook_share_reward: 0,
            twitter_share_reward: 0
        }
    }

    handleFbShare = () => {
        window.FB.ui({
            appID: env.facebook_client_id,
            method: 'feed',
            quote: "I just created an account on dSocial, the world's first decentralized and %23censorshipresistant social network. You can join the social revolution and earn 1000 coins in the process. Join us at https://dsocial.network",
            link: 'https://dsocial.network',
        }, (response) => {
            this.setState({ fbPostResponse: response });
            Axios({
                method: 'POST',
                url: API.share_with_fb,
                data: {
                    status: this.state.fbPostResponse,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => {
                    this.setState({ loading: false })
                    if (res.data.success) {
                        // window.location.hash = "#fifth";
                        localStorage.setItem('s3', true)
                        if(!this.state.facebook_share_reward) {
                            let amt = this.state.facebook_share_reward + 400;
                            this.setState({facebook_share_reward: amt})
                        }
                    } else if(!res.data.success) {
                        Swal.fire({
                            title: 'Error',
                            text: 'You must share on facebook',
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonText: 'Okay',
                        })
                    }
                })
                .catch(err => {
                    this.setState({ loading: false })
                    console.log("error", err)
                    window.location.hash = '#fifth'
                })
        });
    }

    handleTweet = () => {
        const text = "I just joined dSocial, a %23decentralized social network that cannot censor its users. Join the %23dweb revolution at https://dsocial.network"
        window.open(`https://twitter.com/intent/tweet?&text=${text}`, '_blank', 'height=500,width=400')
        if (localStorage.getItem('s2')) {
            this.setState({ loading: true })
            if (localStorage.getItem('twitterName')) {
                Axios({
                    method: 'POST',
                    url: API.user_share_validation,
                    data: {
                        screenname: localStorage.getItem('twitterName')
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(res => {
                        this.setState({ loading: false })
                        if (res.data.success) {
                            if(!this.state.twitter_share_reward){
                                let amt = this.state.twitter_share_reward + 200;
                                this.setState({twitter_share_reward: amt})
                            }
                        } else if(!res.data.success) {
                            Swal.fire({
                                title: 'Error',
                                text: 'You must share on Facebook and Twitter before continuing to Step 4.',
                                icon: "error",
                                showCancelButton: false,
                                confirmButtonText: 'Okay',
                            })
                        }
                    })
                    .catch(err => {
                        this.setState({ loading: false })
                        console.error('Error', err)
                    })
            } else {
                this.setState({loading: false})
                window.location.hash = "#fifth";
                localStorage.setItem('s3', true)
                // Swal.fire({
                //     title: 'Error',
                //     text: 'You must share on Facebook and Twitter before continuing to Step 4.',
                //     icon: "error",
                //     showCancelButton: false,
                //     confirmButtonText: 'Okay',
                // })
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please complete step 2!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
                .then(() => window.location.hash = '#second')
        }
    }

    handleNextStep = (e) => {
        e.preventDefault();
        if (localStorage.getItem('s2')) {
            this.setState({ loading: true })
            if (this.state.facebook_share_reward || this.state.twitter_share_reward) {                
                this.setState({ loading: false })
                window.location.hash = "#fifth";
                localStorage.setItem('s3', true)
                localStorage.setItem('share_reward', this.state.facebook_share_reward + this.state.twitter_share_reward)
            } else {
                this.setState({loading: false})
                window.location.hash = "#fifth";
                localStorage.setItem('s3', true)
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please complete step 2!!',
                icon: "error",
                showCancelButton: false,
                confirmButtonText: 'Okay',
            })
                .then(() => window.location.hash = '#second')
        }
    }

    render() {
        return localStorage.getItem('twitterName') || localStorage.getItem('googleEmail') || localStorage.getItem('fbUserId') ? (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <span style={{"font-family": 'sans-serif'}}>You have earned:</span>
                    <img src={gold} alt='gold' width="15 px" height="auto"></img> <span>{parseInt(localStorage.getItem('login_reward')) + parseInt(localStorage.getItem('like_reward') || 0) + parseInt(this.state.facebook_share_reward) + parseInt(this.state.twitter_share_reward)} RIX</span>
                    <span className="h4 d-block">Spread the word about dSocial...</span>
                    <p className="w-75 m-auto">Help us spread the word about dSocial to your friends and earn 400 RIX for  platform you post on. Click the buttons below to spread the word.</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8">
                        {
                        (localStorage.getItem('fbUserId') || localStorage.getItem('twitterName')) ? 
                            <div className="list-group">
                            {localStorage.getItem('fbUserId') && 
                             <a onClick={this.handleFbShare} className="mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center c-pointer" href="/#">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon13.svg" alt="assets/img/icons/icon01.svg" className="d-block mr-3 icon" />
                                    <p className='warning' style={{color: 'black', position: "absolute", right: '35px', bottom: '6px'}}>+<span> 400 RIX</span></p>
                                    <span className="mb-0 h6 mb-0">Share The Revolution On Facebook</span>
                                </div>
                                <i className="fas fa-chevron-right" />
                             </a>
                            }
                            {localStorage.getItem('twitterName') && 
                              <a onClick={this.handleTweet} id="fakeTweetBtn" className="mt-2 mb-2 b-1 list-group-item list-group-item-action d-flex justify-content-between align-items-center c-pointer" href="/#">
                                <div className="d-flex align-items-center">
                                    <img src="assets/img/icons/icon57.svg" alt="assets/img/icons/icon02.svg" className="d-block mr-3 icon" />
                                    <p className='warning' style={{color: 'black', position: "absolute", right: '35px', bottom: '6px'}}>+<span> 400 RIX</span></p>
                                    <span className="mb-0 h6 mb-0">Tweet About The Revolution On Twitter</span>
                                </div>
                                <i className="fas fa-chevron-right" />
                              </a>
                            }
                        </div> : <p>
                        Sorry, you have to be logged in with either Twitter, Facebook or both to take part in this step.
                        </p>
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-custom h-2 min-w-10"
                        onClick={this.handleNextStep}
                    >
                        {
                            this.state.loading ?
                                <Loader
                                    type="TailSpin"
                                    className="ml-1 mt-auto mb-auto"
                                    color="white"
                                    height={30}
                                    width={30}
                                />
                                :
                                "Proceed to Step 5"
                        }
                    </button>
                </div>
            </div>
        ) : (<div className="card-body p-4 px-lg-5">
        <div className="mb-4 text-center">
        <div className="column justify-content-center mb-3">
            <img src="/assets/img/arisen/alert.svg" className="w-15 mb-2" alt="warning" />
            <h2 className="mt-auto mb-auto ml-2">Error</h2>
        </div>
        <span className="h4 d-block">Please Complete Previous Step</span>
        </div>
        </div>
)
    }
}
