const initialState = {
  data: [
    {
      name: " Testing1",
      number: 9660801827,
      email: "shravanmeena47@gmail.com",
    },
    {
      name: "Testing2",
      number: 8824316660,
      email: "shravanmeena733@gmail.com",
    },
  ],

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
