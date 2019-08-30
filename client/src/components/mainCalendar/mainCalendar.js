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
                              {
                                  title: 'The Title',
                                  start: '2019-08-01',
                                  end: '2019-08-06'
                              }
                          ]}
            />
        );
    }
}

export default MainCalendar;