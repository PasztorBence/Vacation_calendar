import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAllRequest, changeRequestState, changeRemainingDay } from "../../actions/profileActions";
import Moment from "react-moment";

class AdminTable extends Component {

    componentDidMount() {
        this.props.getAllRequest();
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        if (!(this.props.auth.user.user_level === "admin")) {
            this.props.history.push('/main');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    acceptOnClick(requestId, userId, remainingDays, startDate, endDate, state, email, notification_email) {
        if (state !== 'Elfogadva') {
            //Calculating the difference of the start and the end date
            const end = new Date(endDate);
            const start = new Date(startDate);
            const diffInTime = end.getTime() - start.getTime();
            const diffInDays = (diffInTime / (1000 * 3600 * 24)) + 1;
            const newDays = {
                remaining_days: remainingDays - diffInDays
            };
            this.props.changeRemainingDay(userId, newDays);
            const newState = {
                state: 'Elfogadva',
                color: 'green',
                text_color: 'white',
                start_date: startDate,
                end_date: endDate,
                email: email,
                notification_email: notification_email
            };
            this.props.changeRequestState(requestId, newState);
        }
    }

    declineOnClick(requestId, userId, remainingDays, startDate, endDate, state, email, notification_email) {
        if (state === 'Elfogadva') {
            //Calculating the difference of the start and the end date
            const end = new Date(endDate);
            const start = new Date(startDate);
            const diffInTime = end.getTime() - start.getTime();
            const diffInDays = (diffInTime / (1000 * 3600 * 24)) + 1;
            const newDays = {
                remaining_days: remainingDays + diffInDays
            };
            this.props.changeRemainingDay(userId, newDays);
        }
        if ((state === 'Elfogadva') || (state === 'Függőben')) {
            const newState = {
                state: 'Elutasítva',
                color: 'red',
                text_color: 'white',
                start_date: startDate,
                end_date: endDate,
                email: email,
                notification_email: notification_email
            };
            this.props.changeRequestState(requestId, newState);
        }
    }

    render() {
        const { loading, allRequests } = this.props.profile;
        let tableContent;
        let tableItems;

        if (!(allRequests === null || loading)) {
            tableItems = allRequests.map(request => (
                <tr key={request._id}>
                    <td>{request.user.name}</td>
                    <td><Moment format={"YYYY.MM.DD"}>{request.start_date}</Moment></td>
                    <td><Moment format={"YYYY.MM.DD"}>{request.end_date}</Moment></td>
                    <td>{request.description}</td>
                    <td><Moment format={"YYYY.MM.DD"}>{request.createdAt}</Moment></td>
                    <td>{request.user.remaining_days}</td>
                    <td>{request.state}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={this.acceptOnClick.bind(this, request._id, request.user._id, request.user.remaining_days, request.start_date, request.end_date, request.state, request.user.email, request.user.notification_email)}
                        >
                            Elfogad
                            </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.declineOnClick.bind(this, request._id, request.user._id, request.user.remaining_days, request.start_date, request.end_date, request.state, request.user.email, request.user.notification_email)}
                        >
                            Elutasít
                            </button>
                    </td>
                </tr>
            )
            )
        }

        if (allRequests === null || loading) {
            tableContent = <h4>Betöltés...</h4>
        } else {
            tableContent = (
                <div className="table-responsive">
                    <table
                        id="mytable"
                        className="table table-sm table-bordered table-striped table-hover"
                    >
                        <thead>
                            <tr>
                                <th>Név</th>
                                <th>Ettől</th>
                                <th>Eddig</th>
                                <th>Leírás</th>
                                <th>Ekkor kérte</th>
                                <th>Kérhető napok</th>
                                <th>Állapot</th>
                                <th>Elfogad</th>
                                <th>Elutasít</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableItems}
                        </tbody>
                    </table>
                </div>
            )
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md">
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="/unalloweddates">Tiltott dátumok</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/remainingdays">Dolgozók kérhető napjai</a>
                            </li>
                        </ul>
                        <h4>Kért szabadságok:</h4>
                        {tableContent}
                    </div>
                </div>
            </div>)
    }
}

AdminTable.propTypes = {
    getAllRequest: PropTypes.func.isRequired,
    changeRequestState: PropTypes.func.isRequired,
    changeRemainingDay: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getAllRequest, changeRequestState, changeRemainingDay })(AdminTable);