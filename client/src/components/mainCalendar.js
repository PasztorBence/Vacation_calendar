import React, {Component} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

class MainCalendar extends Component {
    render() {
        return (
            <FullCalendar defaultView="dayGridMonth"
                          plugins={[dayGridPlugin, interactionPlugin]}
                          firstDay={1}
                          selectable={true}
                          contentHeight={"auto"}
                          height={"auto"}
                          events={[
                              { // this object will be "parsed" into an Event Object
                                  title: 'The Title', // a property!
                                  start: '2019-08-01', // a property!
                                  end: '2019-08-06' // a property! ** see important note below about 'end' **
                              }
                          ]}
            />
        );
    }
}

export default MainCalendar;