import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { Calendar, momentLocalizer } from "react-big-calendar";

import { Navbar } from "../UI/Navbar";
import { messages } from "../../Helpers/calendar-messages-es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../Actions/uiActions";
import { AddNewFab } from "../UI/AddNewFab";
import { eventClearActive, eventSetActive, eventStartLoading } from "../../Actions/eventsActions";
import { DeleteEventFab } from "../UI/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);





export const CalendarScreen = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const [lastView, setLastView] = useState( localStorage.getItem("lastView") || "month" );
    const { uid } = useSelector( state => state.auth );

    useEffect(() => {
      dispatch( eventStartLoading() )
    }, [dispatch]);
    

    const onDoubleClick = (event) => {
      console.log(event);
      dispatch(uiOpenModal());
    };

    const onSelectEvent = (event) => {
      dispatch(eventSetActive(event));
      // dispatch( uiOpenModal() );
    };

    const onViewChange = (event) => {
      setLastView(event);
      localStorage.setItem("lastView", event);
    };


    const onSelectSlot = (event) => {
      console.log(event);
      dispatch( eventClearActive() );
    }


    const eventStyleGetter = (event, start, end, isSelected) => {


      const style = {
        backgroundColor: ( uid === event.user._id ) ? "#367CF7" : "#465660",
        borderRadius: "0px",
        opacity: 0.8,
        display: "block",
        color: "white",
      };

      return {
        style,
      };
    };

    return (
      <div className="calendar-screen">
        <Navbar />

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />

        <CalendarModal />

        {activeEvent && <DeleteEventFab />}
        <AddNewFab />
      </div>
    );
};
