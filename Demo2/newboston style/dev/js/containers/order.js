import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

class order extends Component {

renderList() {
        return this.props.menu.map((menu) => {
          if(menu.status){
            return (
                <Jumbotron className ="container-fluid">
                <div className = 'col-sm-5'>{menu.name} </div>
                </Jumbotron>
            );
        }

        });
        return(<h2>hello</h2>);
    }    

    render() {
        return( <div>
        {this.renderList()};
        </div>);
    }
}

function mapStateToProps(state) {
    console.log("about to enter orderplaced");
   console.log(state.orderplaced);
    return {
        ordered: state.orderplaced,
        menu: state.menu
    };
}

export default connect(mapStateToProps)(order);
