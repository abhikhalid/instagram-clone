export const initialState = {
    user: null,
    messageEmpty:false,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_MESSAGE_EMPTY: "SET_MESSAGE_EMPTY",
};



function reducer(state, action) {

    // console.log(action);

    switch (action.type) {
        case actionTypes.SET_USER:

            return {
                ...state,
                user: action.user,
            };
        
        case actionTypes.SET_MESSAGE_EMPTY:
            return {
                ...state,
                messageEmpty: action.messageEmpty,
             }

        default:

            return state;
    }
}

export default reducer;


