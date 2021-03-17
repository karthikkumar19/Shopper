import React,{useState} from 'react';
import { createStore, combineReducers ,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import OrdersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';



import AppNavigator from './Navigation/AppNavigator';


const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: OrdersReducer,
    auth:authReducer
  });
  
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  // const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;




export default function App() {


  return (
    
    <Provider store={store}>
    <AppNavigator/>
  </Provider>
  );
}
