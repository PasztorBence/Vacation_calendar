import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getCurrentProfile, changeEmail, changePassword } from "../../actions/profileActions";

class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            email_again: '',
            password: '',
            password_again: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.newPasswordOnSubmit = this.newPasswordOnSubmit.bind(this);
        this.newEmailOnSubmit = this.newEmailOnSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    newPasswordOnSubmit(e) {
        e.preventDefault();
        const id = this.props.auth.user.id;
        const newData = {
            password: this.state.password,
            password_again: this.state.password_again
        };
        this.props.changePassword(id, newData)
    }

    newEmailOnSubmit(e) {
        e.preventDefault();
        const id = this.props.auth.user.id;
        const newData = {
            email: this.state.email,
            email_again: this.state.email_again
        };
        this.props.changeEmail(id, newData)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-5 text-center">Profil Adatmódosítás</h1>
                            <form onSubmit={this.newEmailOnSubmit}>
                                <div className="form-group">
                                    <h4>E-mail cím:</h4>
                                    <input
                                        type="string"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder=""
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>
                                <div className="form-group">
                                    <h4>E-mail cím újra:</h4>
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email_again
                                        })}
                                        placeholder=""
                                        name="email_again"
                                        value={this.state.email_again}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">{errors.email_again}</div>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-1" />
                            </form>
                            <p></p>
                            <form onSubmit={this.newPasswordOnSubmit}>
                                <div className="form-group">
                                    <h4>Jelszó:</h4>
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder=""
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <div className="form-group">
                                    <h4>Jelszó újra:</h4>
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password_again
                                        })}
                                        placeholder=""
                                        name="password_again"
                                        value={this.state.password_again}
                                        onChange={this.onChange}
                                    />
                                    <div className="invalid-feedback">{errors.password_again}</div>
                                    <div className="valid-tooltip">
                                        Looks good!
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, changeEmail, changePassword })(UserProfile);