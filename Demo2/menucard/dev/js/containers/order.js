import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class order extends Component {
    
    

    render() {
        if (!this.props.menu) {
            return (  
                <div className ="container-fluid"> hello</div>
                );
        }

        return this.props.menu.map((orderplaced) => {
            console.log(orderplaced.name);
            return (
                <Jumbotron className ="container-fluid">
                <div className = 'col-sm-5'>{orderplaced.name} </div>
                </Jumbotron>
            );
        });
    }
}

function mapStateToProps(state) {
    return {
        orderplaced: state.orderplaced
    };
}

export default connect(mapStateToProps)(order);
