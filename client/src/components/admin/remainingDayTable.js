import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {
    getCurrentProfile,
    getRequests,
    deleteRequest,
    getAllUser,
    changeRemainingDay
} from "../../actions/profileActions";

class RemainingDaysTable extends Component {
    constructor() {
        super();
        this.state = {
            newDay: "",
            id: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getAllUser();
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
    }

    onSubmit(e) {
        e.preventDefault();
        const id = this.state.id;
        const newData = {
            remaining_days: this.state.newDay
        };

        this.props.changeRemainingDay(id, newData);
        window.location.reload()
    }

    render() {
        const {profile, loading, users} = this.props.profile;

        let tableContent;
        let tableItems;
        let selectOptions;
        if (!(users === null)) {
            tableItems = users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.remaining_days}</td>
                    </tr>
                )
            );
            selectOptions = users.map(user => (
                    <option key={user._id}
                            value={user._id}
                    >
                        {user.name}
                    </option>
                )
            );
        }
        if (profile === null || loading) {
            tableContent = (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } else {
            tableContent = (
                <div className="table-responsive">
                    <table id="mytable"
                           className="table table-sm table-bordered table-striped table-hover col-lg-4 col-md-6">
                        <thead>
                        <tr>
                            <th>Dolgozó</th>
                            <th>Jelenleg kérhető napok</th>
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
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <h4>Kérhető napok módosítása:</h4>
                                <select className="form-control col-lg-4"
                                        name="id"
                                        value={this.state.id}
                                        onChange={this.onChange}
                                >
                                    {selectOptions}
                                </select>
                                <input type="number"
                                       className="form-control col-lg-4"
                                       placeholder="Új napok száma"
                                       name="newDay"
                                       value={this.state.newDay}
                                       onChange={this.onChange}
                                />
                                <input type="submit"
                                       className="btn btn-info btn-block mt-4 col-lg-4"
                                />
                            </div>
                        </form>
                        <h4>Kérhető napok:</h4>
                        {tableContent}
                    </div>
                </div>
            </div>
        )
    }
}

RemainingDaysTable.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getRequests: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    getAllUser: PropTypes.func.isRequired,
    changeRemainingDay: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {
    getCurrentProfile,
    getRequests,
    deleteRequest,
    getAllUser,
    changeRemainingDay
})(RemainingDaysTable);