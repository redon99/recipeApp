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
  UPDATE_USER_INIT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RECIPE_INIT,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_ERROR,
  GET_RECIPES_INIT,
  GET_RECIPES_SUCCESS,
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
  isEditing: false,
  editRecipeId: '',
  title: '',
  prepTime: 1,
  servings: 1,
  cuisineOptions: [
    'italian',
    'greek',
    'japanese',
    'american',
    'mexican',
    'other',
  ],
  cuisine: '',
  imgURL: '',
  ingredients: null,
  recipeDescription: '',
  recipes: [],
  totalRecipes: 0,
  numOfPages: 1,
  page: 1,
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
      config.headers['Authorization'] = `Bearer ${state.token}`;
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
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
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
      const { user, token } = response.data.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocaleStorage({ user, token });
    } catch (err) {
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
    dispatch({ type: UPDATE_USER_INIT });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);

      const { user, token } = data.data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocaleStorage({ user, token });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { message: err.response.data.message },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createRecipe = async () => {
    dispatch({ type: CREATE_RECIPE_INIT });
    try {
      const { title, recipeDescription, prepTime, servings, cuisine, imgURL } =
        state;
      await authFetch.post('/recipes', {
        title,
        recipeDescription,
        prepTime,
        servings,
        cuisine,
        imgURL,
      });
      dispatch({ type: CREATE_RECIPE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (err) {
      if (err.response.status === 401) return;
      dispatch({
        type: CREATE_RECIPE_ERROR,
        payload: { message: err.response.data.message },
      });
    }
    clearAlert();
  };

  const getAllRecipes = async () => {
    dispatch({ type: GET_RECIPES_INIT });
    try {
      const { data } = await authFetch.get('/recipes');
      const { recipes, totalRecipes, numOfPages } = data.data;
      dispatch({
        type: GET_RECIPES_SUCCESS,
        payload: {
          recipes,
          totalRecipes,
          numOfPages,
        },
      });
    } catch (err) {
      console.log(err.response);
    }
    clearAlert();
  };

  const setEditRecipe = id => {
    console.log(`Set edit recipe: ${id}`);
  };
  const deleteRecipe = id => {
    console.log(`delete recipe: ${id}`);
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
        handleChange,
        clearValues,
        createRecipe,
        getAllRecipes,
        setEditRecipe,
        deleteRecipe,
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
