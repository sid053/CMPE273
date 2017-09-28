import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';
import {addTodo} from "../actions/index";

class Menu extends Component {

    render() {

        const {item} = this.props;
        

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-12">
                    <Jumbotron>
                        <div className="row justify-content-md-left">
                            <div className="col-md-4">
                                { item.todo }
                            </div>
                            <div className="col-md-4">
                                 ${ item.desc.price }
                            </div>

                            <div className="col-md-4">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                                this.props.addTodo(item.todo)
                            }}
                        >Order</button>
                            </div>
                        </div>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo : (data) => dispatch(addTodo(data))
    };
}

export default connect(null, mapDispatchToProps)(Menu);    // Learn 'Currying' in functional programming


