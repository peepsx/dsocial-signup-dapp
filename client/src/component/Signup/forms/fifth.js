import React from 'react'
// import { env } from '../../config/config'

export default class Fifth extends React.Component {
    render() {
        return (
            <div className="card-body p-4 px-lg-5">
                <div className="mb-4 text-center">
                    <div className="d-flex justify-content-center mb-3">
                        <div className="icon-rounded bg-success">
                            <i className="fas fa-check-circle color-white fs-20" />
                        </div>
                        <h2 className="mt-auto mb-auto ml-2">Congratulations</h2>
                    </div>
                    <span className="h5 d-block">500 RSN is successfully transfered to you Arisen Account.</span>
                    <a className="d-block mb-2 mt-2" href="https://data.arisen.network">Click here to see your transaction.</a>
                    <span className="h4 d-block">Thanks for providing your details.</span>
                    <hr />
                    <a className="btn btn-custom" type="submit" href="#">Done</a>
                </div>
            </div>
        )
    }
}