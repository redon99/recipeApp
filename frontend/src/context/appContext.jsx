import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_INIT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './actions';

import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

const AppContext = React.createContext();

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 5000);
  };

  const addUserToLocaleStorage = ({ newUser, token }) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocaleStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const registerUser = async currentUser => {
    dispatch({ type: REGISTER_USER_INIT });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
        currentUser
      );
      console.log(response);
      const { newUser, token } = response.data.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { newUser, token } });
      addUserToLocaleStorage({ newUser, token });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { message: err.response.data.message },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
