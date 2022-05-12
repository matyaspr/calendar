import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { startChecking } from '../Actions/authActions';

import { LoginScreen } from '../Components/Auth/LoginScreen';
import { CalendarScreen } from '../Components/Calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);
  
  useEffect(() => {

    dispatch( startChecking() );
  
  }, [ dispatch ])
  

  if ( checking ) {
    return (<h5>Cargando...</h5>)
  }


  return (
    <Router >
        <div>
            <Switch>
                <PublicRoute 
                  exact 
                  path="/login"  
                  component={ LoginScreen } 
                  isAuthenticated={ !!uid }
                /> 

                <PrivateRoute 
                  exact 
                  path="/" 
                  component={ CalendarScreen } 
                  isAuthenticated={ !!uid }
                /> 
            </Switch>
        </div>
    </Router>
  )
}
