import { createStore ,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk"
import { cartSlice } from "../features/cartSlice";
import { productSlice } from "../features/productSlice";
const rootReducer=combineReducers({
productSlice,
cartSlice
})
export const store= createStore(rootReducer,applyMiddleware(thunk))