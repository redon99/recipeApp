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

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'error',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === REGISTER_USER_INIT) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Successfuly registered! Logging In...',
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
    };
  }
  if (action.type === LOGIN_USER_INIT) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Success! Logging In...',
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === UPDATE_USER_INIT) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'Profile Updated!',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editRecipeId: '',
      recipeTitle: '',
      prepTime: 1,
      servings: 1,
      cuisine: '',
      imgURL: '',
      ingredients: null,
      recipeDescription: '',
    };

    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_RECIPE_INIT) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_RECIPE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Recipe added!',
    };
  }
  if (action.type === CREATE_RECIPE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'error',
      alertText: action.payload.message,
    };
  }
  if (action.type === GET_RECIPES_INIT) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_RECIPES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      recipes: action.payload.recipes,
      totalRecipes: action.payload.totalRecipes,
      numOfPages: action.payload.numOfPages,
    };
  }
  throw new Error(`no action found: ${action.type}`);
};

export default reducer;
