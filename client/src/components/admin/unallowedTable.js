import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getCurrentProfile, getAllUnAllowedDate, deleteUnAllowing } from "../../actions/profileActions";

class UnAllowedTable extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getAllUnAllowedDate();
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    deleteOnClick(id) {
        this.props.deleteUnAllowing(id, this, this.props.history);
        this.props.getAllUnAllowedDate();
    }

    render() {
        const { profile, loading, unAllowedDates } = this.props.profile;

        let tableContent;
        let tableItems;
        if (!(unAllowedDates === null)) {
            tableItems = unAllowedDates.map(date => (
                <tr key={date._id}>
                    <td><Moment format={"YYYY.MM.DD"}>{date.start_date}</Moment></td>
                    <td>{date.description}</td>
                    <td>
                        <p data-placement="top"
                            data-toggle="tooltip"
                            title="Delete">
                            <button onClick={this.deleteOnClick.bind(this, date._id)}
                                className="btn btn-danger btn-xs"
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
                    <table id="mytable" className="table table-sm table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>dátum</th>
                                <th>Leírás</th>
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
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="/newunalloweddate">Új tiltás</a>
                            </li>
                        </ul>
                        <h4>Tiltott dátumok:</h4>
                        {tableContent}
                    </div>
                </div>
            </div>
        )
    }
}

UnAllowedTable.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getAllUnAllowedDate: PropTypes.func.isRequired,
    deleteUnAllowing: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, getAllUnAllowedDate, deleteUnAllowing })(UnAllowedTable);