import React, {Component} from 'react';
import AdminTableItem from "./adminTableItem";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

class AdminTable extends Component {

    componentDidMount() {
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

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md">
                        <h4>Kért szabadságok:</h4>
                        <div className="table-responsive">
                            <table id="mytable" className="table table-bordred table-striped">
                                <thead>
                                <th>Név</th>
                                <th>Ettől</th>
                                <th>Eddig</th>
                                <th>Leírás</th>
                                <th>Ekkor kérte</th>
                                <th>Állapot</th>
                                <th>Módosítás</th>
                                <th>Törlés</th>
                                </thead>
                                <tbody>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>
                                <AdminTableItem/>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

AdminTable.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminTable);