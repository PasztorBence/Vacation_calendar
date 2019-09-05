import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {getCurrentProfile, getRequests} from "../../actions/profileActions";

class UserTable extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
        const id = this.props.auth.user.id;
        this.props.getRequests(id);
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        const {profile, loading, requests} = this.props.profile;

        let tableContent;
        let tableItems;
        if (!(requests === null)) {
            console.log(requests);
            tableItems = requests.map(request => (
                    <tr key={request._id}>
                        <td><Moment format={"YYYY.MM.DD"}>{request.start_date}</Moment></td>
                        <td><Moment format={"YYYY.MM.DD"}>{request.end_date}</Moment></td>
                        <td>{request.description}</td>
                        <td>{request.state}</td>
                        <td>
                            <p data-placement="top" data-toggle="tooltip" title="Edit">
                                <button className="btn btn-primary btn-xs"
                                        data-title="Edit"
                                        data-toggle="modal"
                                        data-target="#edit"
                                >
                                    Módosítás
                                </button>
                            </p>
                        </td>
                        <td>
                            <p data-placement="top"
                               data-toggle="tooltip"
                               title="Delete">
                                <button className="btn btn-danger btn-xs"
                                        data-title="Delete"
                                        data-toggle="modal"
                                        data-target="#delete"
                                >
                                    Törlés
                                </button>
                            </p>
                        </td>
                    </tr>
                )
            );
        }
        if (profile === null || loading) {
            tableContent = <h4>Betöltés...</h4>
        } else {
            tableContent = (
                <div className="table-responsive">
                    <table id="mytable" className="table table-bordred table-striped">
                        <thead>
                        <tr>
                            <th>Ettől</th>
                            <th>Eddig</th>
                            <th>Leírás</th>
                            <th>Állapot</th>
                            <th>Módosítás</th>
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, getRequests})(UserTable);