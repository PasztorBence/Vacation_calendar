import React, {Component} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

class MainCalendar extends Component {

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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MainCalendar);