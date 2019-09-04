import React, {Component} from 'react';
import UserTableItem from "./userTableItem";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
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
        const {profile, loading} = this.props.profile;

        let tableContent;

        if (profile === null || loading) {
            tableContent = <h4>Betöltés...</h4>
        } else {
            tableContent =
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
                        <UserTableItem/>
                        <UserTableItem/>
                        <UserTableItem/>
                        <UserTableItem/>
                        <UserTableItem/>
                        <UserTableItem/>
                        <UserTableItem/>
                        </tbody>
                    </table>
                </div>
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