import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITIES = "FILTER_BY_ACTIVITIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";
export const CLEAN_COUNTRY = "CLEAN_COUNTRY";

export function getAllCountries() {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/countries");

      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/activities");

      return dispatch({
        type: GET_ACTIVITIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByActivities(payload) {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios(`http://localhost:3001/countries?name=${name}`);
      return dispatch({
        type: GET_COUNTRIES_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postActivity(activity) {
  return async (dispatch) => {
    const json = await axios.post("http://localhost:3001/activities", activity);
    return dispatch({
      type: CREATE_ACTIVITY,
    });
  };
}

export function getDetailById(id) {
  return async (dispatch) => {
    try {
      const json = await axios(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: GET_DETAIL_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanCountry() {
  return {
    type: CLEAN_COUNTRY,
    payload: [],
  };
}
