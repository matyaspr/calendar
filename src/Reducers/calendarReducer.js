import { types } from "../Types/types";

/*
{
        id: new Date().getTime(),
        title: 'All Day Event',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes : 'kajshdfkjashdf',
        user: {
                _id: '123',
                name: 'Juan',
        },
    }
*/


const initialState = {
    events: [],
    activeEvent: null
};



export const CalendarReducer = ( state = initialState, action ) => {
    
        switch ( action.type ) {
    
            case types.eventSetActive:
                return {
                    ...state,
                    activeEvent: action.payload,
                };
    
            case types.eventAddNew:
                return {
                    ...state,
                    events: [
                        ...state.events,
                        action.payload,
                    ],
                };

            case types.eventClearActive:
                return {
                    ...state,
                    activeEvent: null,
                };

            case types.eventUpdate:
                return {
                    ...state,
                    events: state.events.map( event =>
                        event.id === action.payload.id ? ( action.payload ) : event
                    ),
                };

            case types.eventDelete:
                return {
                    ...state,
                    events: state.events.filter( event => (event.id !== state.activeEvent.id) ),
                    activeEvent: null, 
                };

            case types.eventLoaded:
                return {
                    ...state,
                    events: [ ...action.payload ]
                }
                
            case types.eventLogout:
                return {
                    ...initialState
                }

            default:
                return state;
        }
}
