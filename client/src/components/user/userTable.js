import React, {Component} from 'react';
import UserTableItem from "./userTableItem";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

class UserTable extends Component {

    componentDidMount() {
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
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md">
                        <h4>Kért szabadságok:</h4>
                        <div className="table-responsive">
                            <table id="mytable" className="table table-bordred table-striped">
                                <thead>
                                <th>Ettől</th>
                                <th>Eddig</th>
                                <th>Leírás</th>
                                <th>Állapot</th>
                                <th>Módosítás</th>
                                <th>Törlés</th>
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
                    </div>
                </div>
            </div>)
    }
}

UserTable.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserTable);