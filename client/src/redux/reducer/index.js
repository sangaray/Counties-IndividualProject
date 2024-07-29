import {
  GET_ALL_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITIES,
  ORDER_BY_POPULATION,
  ORDER_BY_NAME,
  GET_COUNTRIES_BY_NAME,
  CREATE_ACTIVITY,
  GET_DETAIL_BY_ID,
  CLEAN_COUNTRY,
} from "../actions/index.js";

const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  allActivities: [],
  detail: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const filterByContinents = allCountries.filter(
        (c) => c.continents === action.payload
      );
      return {
        ...state,
        countries: filterByContinents,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case FILTER_BY_ACTIVITIES:
      const countries = state.allCountries;
      const filterByActivities =
        action.payload === "all"
          ? state.allCountries
          : countries.filter((c) =>
              c.activities?.find((a) => a.name === action.payload)
            );
      return {
        ...state,
        countries: filterByActivities,
      };

    case ORDER_BY_NAME:
      let sortName =
        action.payload === "a-z"
          ? state.countries.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        countries: sortName,
      };

    case ORDER_BY_POPULATION:
      let sortPopulation =
        action.payload === "asc"
          ? state.countries.sort((a, b) => {
              return a.population - b.population;
            })
          : state.countries.sort((a, b) => {
              return b.population - a.population;
            });
      return {
        ...state,
        countries: sortPopulation,
      };

    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    case GET_DETAIL_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAN_COUNTRY:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export default reducer;
