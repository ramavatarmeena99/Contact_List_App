const initialState = {
  data: [],

  dataForEdit: {},
};

const countactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACT_DATA": {
      return { ...state, data: action.payload };
    }

    case "EDIT_DATA": {
      return { ...state, dataForEdit: action.payload };
    }
    default:
      return state;
  }
};

export default countactReducer;
