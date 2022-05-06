const initialState = {
  recipes: [],
  allRecipes: [],
  typeDiets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "FILTER_BY_TYPE_DIET":
      const allRec = state.allRecipes;
      const typeFiltered =
        action.payload === "All"
          ? allRec
          : allRec.filter((el) => el.diets?.includes(action.payload));
      return {
        ...state,
        recipes: typeFiltered,
      };

    case "ORDER_BY_NAME":
      let order =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => (a.name > b.name ? 1 : -1))
          : state.recipes.sort((a, b) => (a.name < b.name ? 1 : -1));
      return {
        ...state,
        recipes: order,
      };

    case "ORDER_BY_PUNCTUATION":
      let orderPunctuation =
        action.payload === "menormayor"
          ? state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) {
                return -1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderPunctuation,
      };

    case "GET_RECIPES_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };

    case "GET_RECIPES_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_TYPE_DIET":
      return {
        ...state,
        typeDiets: action.payload,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_DELETE_DETAIL":
      return {
        ...state,
        detail: [],
      };

    default: {
      return state;
    }
  }
}

export default rootReducer;
