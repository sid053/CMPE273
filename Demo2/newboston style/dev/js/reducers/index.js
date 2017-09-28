import {combineReducers} from 'redux';
import orderPlaced from './reducer-active-user';
import MenuReducer from './reducer-menu';
//import orderPlaced from './reducer-';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
   
    menu:  MenuReducer,
    orderplaced: orderPlaced
   
   

});

export default allReducers
