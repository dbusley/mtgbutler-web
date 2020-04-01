const loadingReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'DONE_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
