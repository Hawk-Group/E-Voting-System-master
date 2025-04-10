// import { combineReducers } from 'redux';

// const initialState = {
//   user: null,
//   candidates: [],
//   results: [],
// };

// const userReducer = (state = initialState.user, action) => {
//   switch (action.type) {
//     case 'REGISTER_USER':
//       return action.payload;
//     case 'LOGIN_USER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const candidatesReducer = (state = initialState.candidates, action) => {
//   switch (action.type) {
//     case 'FETCH_CANDIDATES':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const resultsReducer = (state = initialState.results, action) => {
//   switch (action.type) {
//     case 'FETCH_RESULTS':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   candidates: candidatesReducer,
//   results: resultsReducer,
// });

// export default rootReducer;
import { combineReducers } from 'redux';

// Add your reducers here
const rootReducer = combineReducers({
  // Example: user: userReducer,
});

export default rootReducer;