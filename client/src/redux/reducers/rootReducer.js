import { combineReducers } from "redux";
import postReducer from "../reducers/post";

const rootReducer = combineReducers({
  posts: postReducer,
});
export default rootReducer;
