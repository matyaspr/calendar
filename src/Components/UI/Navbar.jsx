import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../Actions/authActions';

export const Navbar = () => {

  const { name } = useSelector( state => state.auth );
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch( startLogout() );
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className="navbar-brand">
            { name.toUpperCase() }
        </span>


        <button 
          className="btn btn-danger"
          onClick={ handleLogout }>
            <i className="fas fa-sign-out"></i> 
            <span> Salir </span>
        </button>
    </div>
  )
}
