import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {clickMenu} from '../actions/menuaction';
import {Button, Jumbotron} from 'react-bootstrap';

class MenuList extends Component{


 renderList() {
        return this.props.menu.map((menu) => {

            return (
                <Jumbotron className ="container-fluid">
                <div className = 'col-sm-5'>{menu.name} </div>
                <div className = 'col-sm-5'>{menu.price} $ </div>
                <div className = 'col-sm-2'>
               <Button bsStyle="primary"  
               key={menu.id}
                    onClick={() => this.props.clickMenu(menu)}
                     >Add</Button>
                 </div>    
                </Jumbotron>
            );
        });
    }

render() {
return(
      <div>
      {this.renderList()}
      </div>

	);

}

}

function mapStateToProps(state) {
  console.log("inside menu props");
  
    return {
        menu: state.menu
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({clickMenu: clickMenu}, dispatch);
}



export default connect(mapStateToProps, matchDispatchToProps)(MenuList);