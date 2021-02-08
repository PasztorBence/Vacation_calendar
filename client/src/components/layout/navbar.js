import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import {clearCurrentProfile} from "../../actions/profileActions";

class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link"
                       href="/login"
                    >
                        Bejelentkezés
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"
                       href="/register"
                    >
                        Regisztrálás
                    </a>
                </li>
            </ul>
        );

        const loggedInLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="/userprofile"
                       className="nav-link"
                    >
                        Profil
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/login"
                       className="nav-link"
                       onClick={this.onLogoutClick.bind(this)}
                    >
                        Kijelentkezés
                    </a>
                </li>
            </ul>
        );

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-2">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/main">
                            Naptár
                        </a>
                        {isAuthenticated ? <div className="navbar-brand">{user.name}</div> : ''}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#mobile-nav"
                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/user">
                                        Szabadság
                                    </a>
                                </li>
                                <li className="nav-item">
                                    {user.user_level === 'admin' ? <a className="nav-link" href="/admin">Admin</a> : ''}
                                </li>
                            </ul>
                            {isAuthenticated ? loggedInLinks : authLinks}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);