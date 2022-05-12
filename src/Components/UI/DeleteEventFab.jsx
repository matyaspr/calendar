import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../Actions/eventsActions';




export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const handleClickDelete = () => { dispatch( eventStartDelete() ) }



    
  return (
    <button
        className="btn btn-danger btn-fab fab-danger"
        onClick={ handleClickDelete }
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
    </button>
  )
}
