import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classnames from 'classnames';
import {createUnAllowing} from "../../actions/profileActions";

class NewUnAllowing extends Component {
    constructor() {
        super();
        this.state = {
            start_date: '',
            description: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push('/login');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newData = {
            start_date: this.state.start_date,
            description: this.state.description,
        };
        this.props.createUnAllowing(newData, this.props.history)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        //const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Új kérvény</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <h4>Dátum:</h4>
                                    <input
                                        type="date"
                                        className={classnames('form-control form-control-lg', {
                                            //'is-invalid': errors.start_date
                                        })}
                                        placeholder="Start Date"
                                        name="start_date"
                                        value={this.state.start_date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <h4>Leírás:</h4>
                                    <input
                                        type="string"
                                        className={classnames('form-control form-control-lg', {
                                            // 'is-invalid': errors.password
                                        })}
                                        placeholder="Opcionális"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit"
                                       className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewUnAllowing.propTypes = {
    createUnAllowing: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps, {createUnAllowing})(NewUnAllowing);
