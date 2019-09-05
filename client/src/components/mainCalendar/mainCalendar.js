import React, {Component} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getRequests} from "../../actions/profileActions";

class MainCalendar extends Component {

    componentDidMount() {
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
        const {requests} = this.props.profile;
        return (
            <FullCalendar defaultView="dayGridMonth"
                          plugins={[dayGridPlugin, interactionPlugin]}
                          firstDay={1}
                          selectable={true}
                          contentHeight={"auto"}
                          height={"auto"}
                          events={[
                              {
                                  title: 'The Title',
                                  start: '2019-08-01',
                                  end: '2019-08-06'
                              },
                              {
                                  title: 'The Title',
                                  start: '2019-08-01',
                                  end: '2019-08-06'
                              },
                              {
                                  title: 'The Title',
                                  start: '2019-08-02',
                                  end: '2019-08-06'
                              }
                          ]}
            />
        );
    }
}

MainCalendar.propTypes = {
    getRequests: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getRequests})(MainCalendar);