import {ADD_TODO, DONE_TODO} from "../actions/index";

// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {items: {
    "Chicken": {price: '20', status: 'new' , qty:0},
    "Fish": {price: '15', status: 'new' , qty:0},
    "Sandwich": {price: '17', status: 'new', qty:0},
    "Drink": {price: '5', status: 'new' , qty:0}
    },
    total:0
};

const todos = (state = initialState, action) => {
console.log(state.items[action.newItem]);
    switch (action.type) {

        case ADD_TODO :
            return {
                ...state,

                items:{...state.items,
                    [action.newItem] : { price: state.items[action.newItem].price, status:'active', qty: Number(state.items[action.newItem].qty)+1}
                }, total : state.total + Number(state.items[action.newItem].price)

            };

        case DONE_TODO :
            return {
                ...state,

                items:{...state.items,
                    [action.changedTodo] : { price: state.items[action.changedTodo].price, status:'cancel', qty:0}
                }, total : state.total - Number(state.items[action.changedTodo].price * state.items[action.changedTodo].qty)

            };

        default :
            return state;

    }
};

export default todos;