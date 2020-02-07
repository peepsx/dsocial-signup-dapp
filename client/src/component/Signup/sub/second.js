import React from 'react'

export default class Second extends React.Component {
    render() {
        return (
            <div className="card-body py-4">
                <div className="mb-4 text-center">
                    <p className="lead">Please follow Arisen with logged in accounts.</p>
                </div>
                <div className="row">
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/facebook.png" alt="facebook" />
                            <span className="h6 mb-0 d-block">Facebook Page</span>
                            <div
                                className="fb-like mt-2"
                                data-href="https://www.facebook.com/3DModels.48/"
                                data-width=""
                                data-layout="button"
                                data-action="like"
                                data-size="large"
                            >
                            </div>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
                            <span className="h6 mb-0 d-block">Twitter Handle</span>
                            <div className="mt-2">
                                <a href="https://twitter.com/Ashutos83977501?ref_src=twsrc%5Etfw" className="twitter-follow-button"
                                    data-show-screen-name="false"
                                    data-show-count="false"
                                    data-size="large"
                                ></a>
                            </div>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/instagram.png" alt="instagram" />
                            <span className="h6 mb-0 d-block">Instagram Page</span>
                            <a className="btn btn-sm btn-danger mt-2 hover-white" type="button">Follow</a>
                        </button>
                    </div>
                    <div className="col-sm mb-3 mb-sm-0">
                        <button className="btn btn-block btn-outline-light border py-4 h-100 hover-white" type="button">
                            <img className="icon mb-3" src="assets/img/arisen/youtube.png" alt="google" />
                            <span className="h6 mb-0 d-block">Youtube Channel</span>
                            <div className="mt-2">
                                <div 
                                    className="g-ytsubscribe" 
                                    data-channelid="UC2foi1ia54oj0TxlkDYXV9g" 
                                    data-layout="default" 
                                    data-count="hidden">
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center pb-0 pt-3">
                    <button className="btn btn-primary sw-btn-next">Next Step</button>
                </div>
            </div>
        )
    }
}