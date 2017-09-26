import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';
import {Button, Jumbotron} from 'react-bootstrap';



class UserList extends Component {

    renderList() {
        return this.props.users.map((user) => {
            return (
                <Jumbotron className ="container-fluid">
                <div className = 'col-sm-5'>{user.first} {user.last} </div>
                <div className = 'col-sm-1'>
               <Button bsStyle="primary"  
               key={user.id}
                    onClick={() => this.props.selectUser(user)}
                     >view</Button>
                 </div>    
                </Jumbotron>
            );
        });
    }

    render() {
        return (
            <ul>
                {this.renderList()}
            </ul>
        );
    }

}


function mapStateToProps(state) {
    return {
        users: state.users
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(UserList);
