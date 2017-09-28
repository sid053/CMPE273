import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from "../actions/index";
import TodoItem from "./TodoItem";


class Order extends Component {
renderlist(){
	return this.props.todoArr.map((todo,index) => {
                                        return(
                                            <TodoItem
                                                key={index}
                                                item={todo}
                                            />
                                        );
                                    });
}

render(){
	return(
 		<div>
       {this.renderlist()}
       </div>
 		);
}


}

function mapStateToProps(todos) {

console.log(todos);
    const todoArr = Object.keys(todos.items).map((item) => (
        {
            'todo' : item,
            'desc' : todos.items[item]
        }
    ));

    const total = todos.total;

    return {todoArr, total};
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo : (data) => dispatch(addTodo(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);