import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_INIT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_INIT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
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

  const authFetch = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
  });

  //request
  authFetch.interceptors.request.use(
    config => {
      // config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 5000);
  };

  const addUserToLocaleStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
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
      const { user, token } = response.data.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocaleStorage({ user, token });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { message: err.response.data.message },
      });
    }
    clearAlert();
  };

  const loginUser = async currentUser => {
    dispatch({ type: LOGIN_USER_INIT });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        currentUser
      );
      console.log(response);
      const { user, token } = response.data.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      addUserToLocaleStorage({ user, token });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { message: err.response.data.message },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocaleStorage();
  };

  const updateUser = async currentUser => {
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      console.log(data);
    } catch (err) {
      // console.log(err.response);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
