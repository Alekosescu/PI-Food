import axios from "axios";

export function getRecipes() {
  // Here is the connection between the backend and the frontend. The backend is the server and the frontend is the client.
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function filterRecipesByTypeDiet(payload) {
  return {
    type: "FILTER_BY_TYPE_DIET",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPunctuation(payload) {
  return {
    type: "ORDER_BY_PUNCTUATION",
    payload,
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/recipes?name=" + name);
      return dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/recipes/id/${id}`);
    return dispatch({
      type: "GET_RECIPES_BY_ID",
      payload: json.data,
    });
  };
}

export function getTypeDiet() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPE_DIET",
      payload: json.data,
    });
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/recipe", payload);
    return json;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDeleteDetail() {
  return {
    type: "GET_DELETE_DETAIL",    
  };
}
