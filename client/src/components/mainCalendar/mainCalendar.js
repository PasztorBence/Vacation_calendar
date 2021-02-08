import React, { Component } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAllRequest, getAllUnAllowedDate } from "../../actions/profileActions";
//import { whenTransitionDone } from '@fullcalendar/core';

class MainCalendar extends Component {

    componentDidMount() {
        this.props.getAllRequest();
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

    render() {
        const { allRequests, unAllowedDates, loading } = this.props.profile;
        let calendarEvents = [];
        let calendarBackground = [];
        let allData = [];
        let calendar;

        if (!(allRequests === null || loading || unAllowedDates === null)) {
            calendarEvents = allRequests.map(request =>
                (
                    {
                        title: request.user.name + "  - " + request.description + " - " + request.state,
                        start: request.start_date,
                        end: new Date(request.end_date).setDate(new Date(request.end_date).getDate() + 1),
                        color: request.color,
                        textColor: request.text_color,
                        allDay: true,
                    }
                )
            );
            calendarBackground = unAllowedDates.map(date => (
                {
                    start: date.start_date,
                    color: 'black',
                    allDay: true,
                    rendering: 'background'
                }
            )
            );
            allData = calendarEvents.concat(calendarBackground);
            calendar = (
                <div className="container-fluid">
                    <FullCalendar defaultView="dayGridMonth"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        firstDay={1}
                        selectable={true}
                        contentHeight={"auto"}
                        height={"auto"}
                        events={allData}
                    />
                </div>
            )
        }

        return (
            <div>
                {calendar}
            </div>
        );
    }
}

MainCalendar.propTypes = {
    getAllRequest: PropTypes.func.isRequired,
    getAllUnAllowedDate: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getAllRequest, getAllUnAllowedDate })(MainCalendar);