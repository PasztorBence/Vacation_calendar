import React, {Component} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getAllRequest} from "../../actions/profileActions";

class MainCalendar extends Component {

    componentDidMount() {
        this.props.getAllRequest();
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
        const {allRequests, loading} = this.props.profile;
        let calendarEvents = [];
        let calendar;

        if (!(allRequests === null || loading)) {
            calendarEvents = allRequests.map(request =>
                [
                    {
                        title: request.description,
                        start: request.start_date,
                        end: request.end_date
                    }
                ]
            );
            console.log(calendarEvents);
            calendar = (
                    <div className="container-fluid">
                        <FullCalendar defaultView="dayGridMonth"
                                      plugins={[dayGridPlugin, interactionPlugin]}
                                      firstDay={1}
                                      selectable={true}
                                      contentHeight={"auto"}
                                      height={"auto"}
                                      events ={calendarEvents}
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getAllRequest})(MainCalendar);