import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';
import {doneTodo} from "../actions/index";

class TodoItem extends Component {

    render() {

        const {item} = this.props;

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-12">
                    { item.desc.status === 'active'  ? (
                    <Jumbotron>
                        <div className="row justify-content-md-left">
                            <div className="col-md-3">
                                 { item.todo }
                            </div>
                            <div className="col-md-3">
                                 ${ item.desc.price }
                            </div>
                            <div className="col-md-3">
                                Qty: { item.desc.qty }
                            </div>
                            <div className="col-md-3">
                            <button
                                className="close"
                                onClick={() => {
                                    this.props.doneTodo(item.todo);
                                }}
                            ><span aria-hidden={true}>&times;</span></button>
                            </div>
                        </div>
                    </Jumbotron>) : ''}

                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doneTodo : (data) => dispatch(doneTodo(data))
    };
}

export default connect(null, mapDispatchToProps)(TodoItem);    // Learn 'Currying' in functional programming
