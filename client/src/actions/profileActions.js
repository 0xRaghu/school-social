import axios from 'axios';
import {GET_PROFILE , PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from './types';

//Get current profile

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('https://schoolsocial-raghu19.c9users.io/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
}

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('https://schoolsocial-raghu19.c9users.io/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addCompetitions = (expData, history) => dispatch => {
  axios
    .post('https://schoolsocial-raghu19.c9users.io/api/profile/competition', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add education
export const addAchievements = (eduData, history) => dispatch => {
  axios
    .post('https://schoolsocial-raghu19.c9users.io/api/profile/achievement', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteCompetition = id => dispatch => {
  axios
    .delete(`https://schoolsocial-raghu19.c9users.io/api/profile/competition/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteAchievement = id => dispatch => {
  axios
    .delete(`https://schoolsocial-raghu19.c9users.io/api/profile/achievement/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('https://schoolsocial-raghu19.c9users.io/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}