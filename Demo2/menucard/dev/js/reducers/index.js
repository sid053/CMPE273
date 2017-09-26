import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import orderPlaced from './reducer-active-user';
import MenuReducer from './reducer-menu';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    users: UserReducer,
    menu:  MenuReducer,
    orderplaced: orderPlaced
});

export default allReducers
