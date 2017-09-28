import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';
import {addTodo} from "../actions/index";
import Order from "./Order";
import MyToDoItems from "./MyToDoItems";

class MyToDo extends Component {

      

    render() {

        const tot = `Total Amount : ${this.props.total}`;
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                        <h2 className="text-center">Restaurant</h2>
                    </div>

                </div>
                <hr/>
               
                <div className="row ">
                        <div className="col-sm-6">
                            <Panel header="Menu" bsStyle="primary">
                               <MyToDoItems/>
                            </Panel>
                        </div>
                        <div className="col-md-6">
                           <Panel header="Order" footer={tot} bsStyle="primary">

                               <Order/>

                            </Panel>

                        </div>


                
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyToDo);   
