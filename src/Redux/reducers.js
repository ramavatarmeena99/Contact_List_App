const initialState = {
  data: [
    {
      name: "Shravan meena",
      number: 9660801827,
      email: "shravanmeena47@gmail.com",
    },
    {
      name: "Poonma meena",
      number: 9660801826,
      email: "Poonam733@gmail.com",
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
