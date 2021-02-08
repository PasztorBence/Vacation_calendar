import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getCurrentProfile, getRequests, deleteRequest, reThinkRequest } from "../../actions/profileActions";

class UserTable extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getRequests(this.props.auth.user.id);
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    deleteOnClick(id, startDate, endDate) {
        const mailData = {
            start_date: startDate,
            end_date: endDate,
            notification_email: this.props.profile.profile.notification_email,
            name: this.props.profile.profile.name
        }
        this.props.deleteRequest(id, this.props.auth.user.id, mailData);
    }

    reThinkOnClick(id, startDate, endDate) {
        const mailData = {
            start_date: startDate,
            end_date: endDate,
            notification_email: this.props.profile.profile.notification_email,
            name: this.props.profile.profile.name
        }
        this.props.reThinkRequest(id, this.props.auth.user.id, mailData);
    }

    render() {
        const { profile, loading, requests } = this.props.profile;

        let tableContent;
        let tableItems;
        let availableDays;
        if (!(requests === null || loading)) {
            tableItems = requests.map(request => (
                <tr key={request._id}>
                    <td><Moment format={"YYYY.MM.DD"}>{request.start_date}</Moment></td>
                    <td><Moment format={"YYYY.MM.DD"}>{request.end_date}</Moment></td>
                    <td>{request.description}</td>
                    <td>{request.state}</td>
                    <td>
                        {request.state === 'Függőben' &&
                            <button
                                onClick={this.deleteOnClick.bind(this, request._id, request.start_date, request.end_date)}
                                className="btn btn-danger btn-xs"
                                data-title="Delete"
                                data-toggle="modal"
                                data-target="#delete"
                            >
                                Törlés
                            </button>
                        }
                        {request.state !== 'Függőben' &&
                            <button
                                onClick={this.reThinkOnClick.bind(this, request._id, request.start_date, request.end_date)}
                                className="btn btn-primary btn-xs"
                                data-title="Delete"
                                data-toggle="modal"
                                data-target="#delete"
                            >
                                Felülbírálás kérése
                            </button>
                        }
                    </td>
                </tr>
            ));
        }
        if (!(profile === null || loading)) {
            availableDays = profile.remaining_days;
        }
        if (profile === null || loading) {
            availableDays = <h4>Betöltés...</h4>
            tableContent = <h4>Betöltés...</h4>
        } else {
            tableContent = (
                <div className="table-responsive">
                    <table id="mytable" className="table table-sm table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Ettől</th>
                                <th>Eddig</th>
                                <th>Leírás</th>
                                <th>Állapot</th>
                                <th>Törlés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableItems}
                        </tbody>
                    </table>
                </div>
            );
        }


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md">
                        <a className="nav-link" href="/newrequest">új kérvény</a>
                        <h4>Kérhető napok: {availableDays}</h4>
                        <h4>Kért szabadságok:</h4>
                        {tableContent}
                    </div>
                </div>
            </div>
        )
    }
}

UserTable.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getRequests: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, getRequests, deleteRequest, reThinkRequest })(UserTable);