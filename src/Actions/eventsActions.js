import Swal from "sweetalert2";
import { fetchWithToken } from "../Helpers/fetch";
import { prepareEvents } from "../Helpers/prepareEvents";
import { types } from "../Types/types";




export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});


export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});


export const eventClearActive = () => ({
  type: types.eventClearActive,
});


export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const res = await fetchWithToken("events", event, "POST");
      const body = await res.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const eventStartUpdate = (event) => {
  return async (dispatch) => {

    try {
      const res = await fetchWithToken(`events/${event.id}`, event , "PUT");
      const body = await res.json();

      if (body.ok) {
        dispatch(eventUpdate(body.evento));
      } else {
        Swal.fire("Error", body.msg, "error");
      }

    } catch (error) {
      console.log(error);
    }
  }
}


export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken("events");
      const body = await res.json();
      
      const events = prepareEvents(body.eventos);
      dispatch(eventLoaded( events ));
      
    } catch (error) {}
  };
};


export const eventStartDelete = () => {
  return async (dispatch, getState ) => {

    const { id } = getState().calendar.activeEvent;

    try {
      const res = await fetchWithToken(`events/${id}`, {}, "DELETE");
      const body = await res.json();

      if (body.ok) {
        dispatch(eventDelete());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}



export const eventLogout = () => ({
  type: types.eventLogout,
});


const eventDelete = () => ({
  type: types.eventDelete,
});


const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});


const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});