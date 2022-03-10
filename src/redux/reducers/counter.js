const initial_state = {
  count: 0,
};

const counterReducer = (state = initial_state, action) => {
  if (action.type === "INCREMENT_COUNTER") {
    return {
      ...state,
      count: state.count + 1,
    };
  } else if (action.type === "DECREMENT_COUNTER") {
    return {
      ...state,
      count: state.count - 1,
    };
  } else if (action.type === "SET_VALUE") {
    return {
      ...state,
      count: parseInt(action.value),
    };
  } else if (action.type === "RESET_VALUE") {
    return initial_state;
  }

  return state;
};

export default counterReducer;
