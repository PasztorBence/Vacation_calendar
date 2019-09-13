import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getAllRequest, changeRequestState} from "../../actions/profileActions";
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

    acceptOnClick(id) {
        const newState = {
            state: 'Elfogadva',
            color: 'green'
        };
        this.props.changeRequestState(id, newState)
    }

    declineOnClick(id) {
        const newState = {
            state: 'Elutasítva',
            color: 'red'
        };
        this.props.changeRequestState(id, newState);
    }

    render() {
        const {loading, allRequests} = this.props.profile;
        let tableContent;
        let tableItems;

        if (!(allRequests === null)) {
            tableItems = allRequests.map(request => (
                    <tr key={request._id}>
                        <td>{request.user.name}</td>
                        <td><Moment format={"YYYY.MM.DD"}>{request.start_date}</Moment></td>
                        <td><Moment format={"YYYY.MM.DD"}>{request.end_date}</Moment></td>
                        <td>{request.description}</td>
                        <td><Moment format={"YYYY.MM.DD"}>{request.createdAt}</Moment></td>
                        <td>{request.state}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.acceptOnClick.bind(this, request._id)}
                            >
                                Elfogad
                            </button>
                        </td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.declineOnClick.bind(this, request._id)}
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
                                <a className="nav-link" href="#">Dolgozók kérhető napjai</a>
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getAllRequest, changeRequestState})(AdminTable);